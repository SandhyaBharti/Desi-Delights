import express from 'express';
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';
import { orderValidation, validate } from '../utils/validation.js';

const router = express.Router();

router.route('/')
    .get(protect, getOrders)
    .post(protect, orderValidation, validate, createOrder);

router.route('/:id')
    .get(protect, getOrder)
    .put(protect, admin, updateOrderStatus)
    .delete(protect, admin, deleteOrder);

export default router;
