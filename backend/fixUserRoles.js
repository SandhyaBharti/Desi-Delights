import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUserRoles = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find all users and their roles
        const users = await User.find({});
        console.log('All users and their roles:');
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });

        // Check specific users
        const akash = await User.findOne({ email: 'akashkumarmaxx@gmail.com' });
        const sandhya = await User.findOne({ email: 'sandhya@gmail.com' });

        console.log('\n=== USER STATUS CHECK ===');
        console.log(`Akash (${akash?.email}): Role = ${akash?.role}`);
        console.log(`Sandhya (${sandhya?.email}): Role = ${sandhya?.role}`);

        // Make sure Akash is admin
        if (akash && akash.role !== 'admin') {
            await User.findByIdAndUpdate(akash._id, { role: 'admin' });
            console.log('✅ Updated Akash to admin role');
        }

        // Make sure Sandhya is user (not admin)
        if (sandhya && sandhya.role !== 'user') {
            await User.findByIdAndUpdate(sandhya._id, { role: 'user' });
            console.log('✅ Updated Sandhya to user role');
        }

        console.log('\n=== FINAL USER ROLES ===');
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

checkUserRoles();
