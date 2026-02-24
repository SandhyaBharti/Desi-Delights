import User from './models/User.js';

// Simple script to check users in database
const checkUsers = async () => {
    try {
        const users = await User.find({});
        console.log('Total users found:', users.length);
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
