import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import { productValidation, validate } from '../utils/validation.js';

const router = express.Router();

router.route('/')
    .get(protect, getProducts)
    .post(protect, admin, productValidation, validate, createProduct);

router.route('/:id')
    .get(protect, getProduct)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;
