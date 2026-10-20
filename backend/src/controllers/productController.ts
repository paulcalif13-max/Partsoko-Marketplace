import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';
import { Category } from '@prisma/client';

// @desc    Get all products (with optional search, category, seller query)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const category = req.query.category as string;
    const sellerId = req.query.sellerId as string;

    const whereClause: any = {};

    if (keyword) {
      whereClause.OR = [
        { name: { contains: keyword, mode: 'insensitive' as const } },
        { description: { contains: keyword, mode: 'insensitive' as const } },
        { brand: { contains: keyword, mode: 'insensitive' as const } },
        { partNumber: { contains: keyword, mode: 'insensitive' as const } }
      ];
    }

    if (category) {
      const upperCat = category.toUpperCase();
      if (Object.values(Category).includes(upperCat as Category)) {
        whereClause.category = upperCat as Category;
      }
    }

    if (sellerId) {
      whereClause.sellerId = sellerId;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        seller: {
          select: { name: true, email: true, phone: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        seller: {
          select: { name: true, email: true, phone: true }
        }
      }
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, category, partNumber, brand, condition, images, compatibility } = req.body;

    let validCategory: Category = Category.OTHER;
    if (category && Object.values(Category).includes(category.toUpperCase() as Category)) {
      validCategory = category.toUpperCase() as Category;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price: Number(price),
        stock: Number(stock) || 0,
        category: validCategory,
        partNumber: partNumber || null,
        brand: brand || null,
        condition: condition || 'NEW',
        images: Array.isArray(images) ? images : [],
        compatibility: compatibility || null,
        sellerId: req.user.id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.sellerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to edit this product' });
    }

    const { name, description, price, stock, category, partNumber, brand, condition, images } = req.body;

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: name ?? product.name,
        description: description ?? product.description,
        price: price !== undefined ? Number(price) : product.price,
        stock: stock !== undefined ? Number(stock) : product.stock,
        category: category ?? product.category,
        partNumber: partNumber ?? product.partNumber,
        brand: brand ?? product.brand,
        condition: condition ?? product.condition,
        images: images ?? product.images
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.sellerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};
