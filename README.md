# iNet-Mart - E-Commerce Platform

A modern full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform for Desi Delights with complete product management, shopping cart, order processing, and analytics capabilities.

## 🌟 Features

✅ **User Authentication** - JWT-based secure login/registration with admin/user role selection  
✅ **Product Management** - Full CRUD operations with image support and admin-only edit/delete functions  
✅ **Shopping Cart** - Add to cart, quantity management with persistent sessions  
✅ **Order Processing** - Complete order management system with status tracking  
✅ **Analytics Dashboard** - Interactive charts and metrics with comprehensive insights  
✅ **Activity Tracking** - Complete audit trail for all user actions  
✅ **Product Images** - Custom image upload and display with fallback emojis  
✅ **Search & Filter** - Advanced product filtering and sorting capabilities  
✅ **Responsive Design** - Modern UI with Tailwind CSS and mobile optimization  
✅ **Mobile Navigation** - Complete mobile menu with toggle button and cross-device parity  
✅ **Tablet Optimization** - Responsive navigation optimized for tablet screens  
✅ **Navigation Order** - Organized as Dashboard → Users → Activity → Products → Orders → Cart  
✅ **Indian Currency** - Prices displayed in ₹ (Rupees)  
✅ **Admin Access Control** - Role-based access with secure admin functions  
✅ **User Management** - Complete user administration system for admins  
✅ **Port Conflict Resolution** - Robust server startup with automatic port cleanup  

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework with robust error handling
- **MongoDB** & **Mongoose** - Database with optimized schemas and indexing
- **JWT** & **bcrypt** - Authentication and security with token-based auth
- **Multer** - Image upload handling with file validation
- **CORS** - Cross-origin resource sharing for frontend integration
- **Express Validator** - Input validation and sanitization

### Frontend
- **React** (Vite) - Modern UI framework with fast development
- **React Router** - Navigation with protected routes
- **Axios** - HTTP client with interceptors and error handling
- **Recharts** - Data visualization with interactive charts
- **Tailwind CSS** - Modern styling with responsive design
- **React Context** - State management for auth and cart

## 📁 Project Structure

```
Desi-Delights/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection with retry logic
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic with role management
│   │   ├── productController.js  # Product management with CRUD operations
│   │   ├── orderController.js    # Order processing with status updates
│   │   ├── analyticsController.js # Analytics & metrics calculations
│   │   ├── activityController.js # Activity logging with search capabilities
│   │   └── userController.js   # User management for admins
│   ├── middleware/
│   │   ├── auth.js               # Authentication middleware with JWT validation
│   │   └── errorHandler.js      # Comprehensive error handling
│   ├── models/
│   │   ├── User.js               # User schema with role-based access
│   │   ├── Product.js            # Product schema with inventory tracking
│   │   ├── Order.js              # Order schema with status workflow
│   │   └── Activity.js           # Activity schema with audit trail
│   ├── routes/
│   │   ├── auth.js               # Auth routes with secure registration
│   │   ├── products.js           # Product routes with admin protection
│   │   ├── orders.js             # Order routes with status management
│   │   ├── analytics.js          # Analytics routes with comprehensive metrics
│   │   ├── activity.js           # Activity routes with search and filtering
│   │   ├── upload.js            # Image upload route with validation
│   │   └── users.js             # User management routes for admins
│   ├── uploads/                  # Product images folder with 10 sample products
│   │   ├── headphones.jpg        # Wireless Bluetooth Headphones - $2999
│   │   ├── tshirt.jpg           # Men's Casual T-Shirt - $799
│   │   ├── almonds.jpg          # Organic Almonds 500g - $650
│   │   ├── jsbook.jpg           # JavaScript: The Complete Guide - $1299
│   │   ├── bottle.jpg           # Stainless Steel Water Bottle - $499
│   │   ├── yogamat.jpg          # Yoga Mat Anti-Slip - $999
│   │   ├── bulb.jpg             # Smart LED Bulb - $899
│   │   ├── shoes.jpg            # Women's Running Shoes - $2499
│   │   ├── dinner.jpg           # Ceramic Dinner Set (24 pcs) - $3499
│   │   └── protein.jpg         # Protein Powder 1kg - $2199
│   ├── utils/
│   │   └── validation.js         # Input validation with sanitization
│   ├── .env                      # Environment variables with secure defaults
│   ├── .env.example              # Environment template with documentation
│   ├── package.json
│   ├── server.js                 # Main server file with health checks
│   ├── updateUserRole.js         # User role management script
│   ├── fixUserRoles.js          # User role verification script
│   └── addSampleProducts.js     # Sample products initialization script
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # API client with image helpers and interceptors
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation component with admin menu
    │   │   ├── AdminRoute.jsx    # Admin protection wrapper
    │   │   ├── PrivateRoute.jsx  # Auth protection wrapper
    │   │   ├── LoadingSpinner.jsx # Loading component with animations
    │   │   └── ErrorMessage.jsx   # Error display with retry options
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication context with role management
    │   │   └── CartContext.jsx   # Shopping cart context with persistence
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page with form validation
    │   │   ├── Register.jsx      # Registration page with admin/user selection
    │   │   ├── Products.jsx      # Products listing with admin edit/delete
    │   │   ├── ProductForm.jsx   # Add/Edit products with image upload
    │   │   ├── Orders.jsx        # Orders management with status tracking
    │   │   ├── Cart.jsx          # Shopping cart with quantity management
    │   │   ├── Dashboard.jsx     # Analytics dashboard with charts
    │   │   ├── Activity.jsx      # Activity logs with search and filter
    │   │   └── Users.jsx         # User management for admins
    │   ├── App.jsx               # Main app component with routing
    │   ├── main.jsx              # App entry point with React 18
    │   └── index.css             # Global styles with Tailwind
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/desi-delights
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3001`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (with admin/user role selection)
- `POST /api/auth/login` - User login with JWT token generation
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with search, filter, sort)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only, protected)
- `PUT /api/products/:id` - Update product (admin only, protected)
- `DELETE /api/products/:id` - Delete product (admin only, protected)

### Image Upload
- `POST /api/upload` - Upload product image (admin only, protected)

### Orders
- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `POST /api/orders` - Create order (protected)
- `PUT /api/orders/:id` - Update order status (protected)
- `DELETE /api/orders/:id` - Delete order (protected)

### Analytics
- `GET /api/analytics` - Get comprehensive analytics (protected)
- `GET /api/analytics/inventory` - Get inventory insights (protected)

### Activity
- `GET /api/activity` - Get activity logs (protected)
- `GET /api/activity/user/:userId` - Get user-specific activities (protected)

### Users (Admin Only)
- `GET /api/users` - Get all users with pagination and search
- `GET /api/users/:id` - Get single user details
- `PUT /api/users/:id` - Update user role and information
- `DELETE /api/users/:id` - Delete user account
- `GET /api/users/stats` - Get user statistics and analytics

### Health & Debug
- `GET /api/health` - Server health check
- `GET /api/test-users` - Debug endpoint to verify user data

## 🎯 Key Features

### 1. Product Management
- Add, edit, and delete products with images
- Real-time inventory tracking with stock status
- Category-based organization (Electronics, Clothing, Food, Books, Home, Sports, Other)
- Search and filter functionality with multiple criteria
- Stock status indicators (Low Stock, Out of Stock)
- Custom image upload with preview and validation
- Product images served from `/uploads` directory
- Fallback to category emojis if image fails to load

### 2. Shopping Cart & Orders
- Add products to cart with quantity controls
- Cart persistence across browser sessions
- Order creation with customer details and shipping address
- Automatic inventory deduction on order placement
- Order status tracking (pending → processing → shipped → delivered)
- Order history and management for users

### 3. Analytics Dashboard
- **Inventory Metrics**: Total products, low stock alerts, category distribution
- **Sales Metrics**: Revenue, order count, trends over time
- **Visualizations**: Pie charts, line graphs, bar charts using Recharts
- **Recent Activity**: Real-time activity feed with user attribution
- **User Analytics**: Registration trends, activity patterns

### 4. Activity Tracking
- Comprehensive audit log for all user actions
- Filter by entity type (product/order/user) and action
- User attribution for all actions with timestamps
- Search capabilities across activity logs
- Real-time activity monitoring and logging

### 5. User Authentication
- Secure registration and login with JWT tokens
- Password hashing with bcrypt for security
- Role-based access control (User/Admin) with visual selection
- Protected routes for admin functions with middleware
- Admin secret key requirement for admin registration
- Session management with automatic token refresh

### 6. User Management (Admin Only)
- Complete user administration system for admins
- View all users with pagination and search functionality
- Update user roles (promote/demote users)
- Delete user accounts with proper validation
- User statistics and analytics dashboard
- Role-based access control enforcement

### 7. Image Management
- Upload product images via backend (`/api/upload`)
- Serve images from `/uploads` directory with CORS headers
- Image preview and error handling in frontend
- Support for external image URLs
- Fallback to category emojis if image fails to load
- Current images: 10 product-specific images with proper naming

## 🗄️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### Product
```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
  status: String (active/inactive/out-of-stock),
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  customerName: String,
  customerEmail: String,
  items: [{
    productId: ObjectId (ref: Product),
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  shippingAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity
```javascript
{
  userId: ObjectId (ref: User),
  userName: String,
  entityType: String (product/order/user),
  entityId: ObjectId,
  entityName: String,
  action: String (created/updated/deleted/ordered),
  description: String,
  timestamp: Date
}
```

## 💰 Currency & Pricing

- All prices displayed in **Indian Rupees (₹)**
- Product prices stored as numbers in database
- Cart totals calculated in ₹
- Order amounts in ₹
- Consistent currency display across all pages

## 🖼️ Product Images

- Images stored in `backend/uploads/` folder
- Supported formats: JPG, PNG, WebP
- Image size limit: 2MB
- Automatic image optimization
- Fallback to category emojis if image fails to load
- Current images: 10 product-specific images
- Image URLs: `http://localhost:5000/uploads/[filename]`

## 🎨 UI/UX Features

- Modern, responsive design with Tailwind CSS
- Smooth animations and transitions with hover effects
- Loading states and comprehensive error handling
- **Mobile-friendly interface** with complete navigation system
- **Tablet-optimized navigation** with responsive breakpoints
- **Cross-device navigation parity** - consistent experience
- Professional color scheme with gradient effects
- Hover effects on product cards and buttons
- Glass morphism effects for modern aesthetics
- **Touch-optimized interface** for mobile and tablet
- **Hamburger menu (☰)** for mobile/tablet navigation
- Consistent design language across all pages

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in .env
2. Use strong JWT_SECRET
3. Configure MongoDB Atlas connection
4. Deploy to Heroku/Railway/DigitalOcean

### Frontend
1. Build production bundle:
   ```bash
   npm run build
   ```
2. Deploy to Vercel/Netlify
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository from: `https://github.com/SandhyaBharti/Desi-Delights`
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request with detailed description

## �️ Security Features

- JWT-based authentication with secure token generation
- Password hashing with bcrypt (salt rounds: 12)
- Role-based access control with admin middleware
- Input validation and sanitization throughout
- CORS configuration for secure cross-origin requests
- Protected routes for all admin operations
- Rate limiting and request validation
- Secure file upload with type and size validation

## 🔧 Troubleshooting

### Port Conflicts
- If port 5000 is in use, run: `taskkill /F /IM node.exe` (Windows)
- Or use: `lsof -ti:5000 | xargs kill -9` (Linux/Mac)
- Server includes automatic port conflict detection and cleanup

### Database Issues
- Check MongoDB connection string in .env file
- Verify MongoDB service is running
- Check network connectivity for MongoDB Atlas
- Use `node addSampleProducts.js` to verify database connection

### Frontend Issues
- Clear browser cache and localStorage
- Check API base URL in axios.js
- Verify JWT token in localStorage
- Check browser console for error messages

## �📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created for Desi Delights e-commerce platform with comprehensive admin and user functionality.

---

**Happy Coding! 🚀**

## 🔄 Recent Updates & Fixes

### ✅ Latest Navigation Improvements (v2.1)
- **Mobile Navigation**: Added complete mobile menu with toggle button (☰)
- **Tablet UI**: Fixed responsive navigation for tablet screens
- **Navigation Order**: Organized as Dashboard → Users → Activity → Products → Orders → Cart
- **Cross-Device Parity**: Consistent navigation across mobile, tablet, and desktop
- **Touch Optimization**: Improved touch targets for mobile/tablet devices
- **Responsive Breakpoints**: Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)

### 📱 Mobile Navigation Features
- **Toggle Button**: Always-visible hamburger menu (☰) for mobile/tablet
- **Full Menu Access**: Complete navigation with text labels and emojis
- **User-Aware Navigation**: Different options for logged-in vs guest users
- **Auto-Close Behavior**: Menu closes after navigation selection
- **Touch-Friendly**: Large tap targets optimized for mobile devices

### 📊 Navigation Structure
```
📊 Dashboard (Admin only)
👥 Users (Admin only)  
📋 Activity (Admin only)
📦 Products (All users)
📋 Orders (Logged-in users)
🛒 Cart (All users)
```

### 🎯 Device-Specific Navigation
- **Mobile & Tablet**: Toggle button (☰) → Full mobile menu
- **Desktop**: Full navigation bar with all links visible
- **Responsive Design**: Optimized for each screen size
- **Consistent Experience**: Same navigation options across all devices

### ✅ Previous Improvements (v2.0)
- **Admin Access Control**: Fixed role-based access for edit/delete functions
- **User Management**: Added complete user administration system
- **Port Resolution**: Implemented robust port conflict handling
- **Product Loading**: Fixed variable issues and API calls
- **Debug Tools**: Added comprehensive debugging capabilities
- **Security**: Enhanced authentication and authorization
- **UI/UX**: Improved responsive design and animations
- **Database**: Optimized schemas and added sample data
- **Error Handling**: Comprehensive error management throughout

### 🛡️ Security Enhancements
- Admin-only routes properly protected
- JWT token validation on all protected endpoints
- Role-based rendering in frontend
- Secure file upload with validation
- Input sanitization and validation

### 📱 Performance Optimizations
- Fast loading with optimized API calls
- Efficient database queries with indexing
- Responsive design for mobile devices
- Image optimization and lazy loading
- State management optimization

### 🎯 Admin Features
- **Edit Products**: Click ✏️ to modify any product
- **Delete Products**: Click 🗑️ to remove products
- **Add Products**: Click ➕ to create new products
- **User Management**: View, edit, and delete user accounts
- **Activity Tracking**: Monitor all system activities
- **Analytics Dashboard**: Comprehensive business insights

### 🚀 Production Ready
- All features tested and working
- Security measures implemented
- Performance optimized
- Documentation complete
- Ready for team collaboration and deployment
