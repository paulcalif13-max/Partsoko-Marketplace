import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Create new order / quotation
// @route   POST /api/orders
// @access  Private (Buyer)
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderItems } = req.body; // Array of { productId, quantity }

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // 1. Fetch settings for global percentages
    let settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    
    // If settings don't exist yet, create defaults
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'global', commissionPercent: 5.0, importTaxPercent: 16.0 }
      });
    }

    // 2. Fetch products to get accurate pricing and verify stock
    const productIds = orderItems.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let subtotal = 0;
    const itemsToCreate = [];

    for (const item of orderItems) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      subtotal += product.price * item.quantity;
      itemsToCreate.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price // Save the price at the time of purchase
      });
    }

    // 3. Calculate Fees based on Admin Settings
    const commissionFee = (subtotal * settings.commissionPercent) / 100;
    const importFee = (subtotal * settings.importTaxPercent) / 100; // Simplified logic
    const taxFee = (subtotal * 16) / 100; // Assuming standard VAT 16%
    const deliveryFee = 20.00; // Flat rate for now, could be dynamic

    const totalAmount = subtotal + commissionFee + importFee + taxFee + deliveryFee;

    // 4. Create Order Transaction
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        commissionFee,
        importFee,
        taxFee,
        deliveryFee,
        status: 'PENDING',
        items: {
          create: itemsToCreate
        }
      },
      include: {
        items: true
      }
    });

    // 5. Update Product Stock
    for (const item of itemsToCreate) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: true } }
      }
    });

    if (order) {
      // Ensure user owns order or is admin
      if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
        return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching order' });
  }
};

// @desc    Get orders for a specific seller
// @route   GET /api/orders/seller
// @access  Private (Seller)
export const getSellerOrders = async (req: AuthRequest, res: Response) => {
  try {
    // Find all order items that belong to products owned by the seller
    const orderItems = await prisma.orderItem.findMany({
      where: {
        product: {
          sellerId: req.user.id
        }
      },
      include: {
        order: {
          include: {
            user: { select: { name: true, email: true, phone: true } }
          }
        },
        product: true
      },
      orderBy: {
        order: {
          createdAt: 'desc'
        }
      }
    });

    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching seller orders' });
  }
};
