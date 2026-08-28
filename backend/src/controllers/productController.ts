import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all products (with optional search query)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    
    const query = keyword ? {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' as const } },
        { description: { contains: keyword, mode: 'insensitive' as const } }
      ]
    } : {};

    const products = await prisma.product.findMany({
      where: query,
      include: {
        seller: {
          select: { name: true }
        }
      }
    });

    res.json(products);
  } catch (error) {
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
          select: { name: true }
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
    const { name, description, price, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        sellerId: req.user.id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    
    // Ensure product belongs to seller
    const existingProduct = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existingProduct || existingProduct.sellerId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this product' });
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price ? Number(price) : existingProduct.price,
        stock: stock !== undefined ? Number(stock) : existingProduct.stock,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id: req.params.id } });
    
    if (!existingProduct || (existingProduct.sellerId !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(401).json({ message: 'Not authorized to delete this product' });
    }

    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};
