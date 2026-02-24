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

// All routes are protected and admin-only
router.use(protect);
router.use(admin);

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
