import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const addSampleProducts = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if products exist
        const existingProducts = await Product.find({});
        console.log(`Found ${existingProducts.length} existing products`);

        if (existingProducts.length === 0) {
            // Add sample products
            const sampleProducts = [
                {
                    name: "Laptop Pro",
                    description: "High-performance laptop for professionals",
                    price: 999.99,
                    category: "Electronics",
                    stock: 10,
                    image: "https://via.placeholder.com/150x150?text=Laptop"
                },
                {
                    name: "Wireless Headphones",
                    description: "Premium noise-cancelling headphones",
                    price: 199.99,
                    category: "Electronics", 
                    stock: 25,
                    image: "https://via.placeholder.com/150x150?text=Headphones"
                },
                {
                    name: "Organic Coffee Beans",
                    description: "Premium arabica coffee beans",
                    price: 24.99,
                    category: "Food",
                    stock: 50,
                    image: "https://via.placeholder.com/150x150?text=Coffee"
                },
                {
                    name: "Yoga Mat",
                    description: "Non-slip exercise yoga mat",
                    price: 29.99,
                    category: "Sports",
                    stock: 30,
                    image: "https://via.placeholder.com/150x150?text=Yoga+Mat"
                },
                {
                    name: "Programming Book",
                    description: "Learn to code with this comprehensive guide",
                    price: 39.99,
                    category: "Books",
                    stock: 15,
                    image: "https://via.placeholder.com/150x150?text=Book"
                }
            ];

            await Product.insertMany(sampleProducts);
            console.log(`Added ${sampleProducts.length} sample products`);
        } else {
            console.log('Products already exist, no need to add samples');
        }

        // Display all products
        const allProducts = await Product.find({});
        console.log(`Total products in database: ${allProducts.length}`);
        allProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price} - ${product.category}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

addSampleProducts();
