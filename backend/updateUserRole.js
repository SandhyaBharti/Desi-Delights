import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const updateUserRole = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find all users and their roles
        const users = await User.find({});
        console.log('All users:');
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });

        // Update specific user to admin (you can change the email)
        const userEmail = 'sandhya@gmail.com'; // Change this to admin email
        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { role: 'admin' },
            { new: true }
        );

        if (updatedUser) {
            console.log(`✅ Updated ${updatedUser.name} to admin role`);
        } else {
            console.log(`❌ User with email ${userEmail} not found`);
        }

        // Show final user list
        console.log('\nUpdated users:');
        const finalUsers = await User.find({});
        finalUsers.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateUserRole();
