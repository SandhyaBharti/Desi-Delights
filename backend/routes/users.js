import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getUserStats
} from '../controllers/userController.js';

const router = express.Router();

// Temporarily remove admin requirement for testing
router.use(protect);

// User management routes
router.route('/')
    .get(getUsers);

router.route('/stats')
    .get(getUserStats);

router.route('/:id')
    .get(getUserById)
    .delete(deleteUser);

router.route('/:id/role')
    .put(updateUserRole);

export default router;
