# Ecommerce Backend API

A complete single-vendor ecommerce backend built with Node.js, Express, MongoDB, and Stripe payment integration.

## Features

- 🔐 **Authentication & Authorization**

  - User registration and login
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Password management

- 🛍️ **Product Management**

  - Complete CRUD operations for products
  - Image upload with Cloudinary
  - Product categories and search
  - Product reviews and ratings
  - Stock management

- 🛒 **Shopping Cart**

  - Add/remove items from cart
  - Update quantities
  - Cart persistence
  - Stock validation

- 📦 **Order Management**

  - Create orders from cart
  - Order status tracking
  - Shipping address management
  - Order history

- 💳 **Payment Integration**

  - Stripe payment processing
  - Payment intent creation
  - Order payment status tracking

- 👥 **User Management**
  - User profiles
  - Admin user management
  - Role management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Stripe account

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=ecommerce_db

   # JWT Configuration
   TOKEN_SECRET=your_jwt_secret_key_here

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # CORS Configuration
   ORIGIN=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint                        | Description       | Auth Required |
| ------ | ------------------------------- | ----------------- | ------------- |
| POST   | `/api/v1/users/register`        | Register new user | No            |
| POST   | `/api/v1/users/login`           | User login        | No            |
| POST   | `/api/v1/users/logout`          | User logout       | Yes           |
| PATCH  | `/api/v1/users/forget-password` | Reset password    | No            |
| PATCH  | `/api/v1/users/change-password` | Change password   | Yes           |

### User Profile

| Method | Endpoint                | Description         | Auth Required |
| ------ | ----------------------- | ------------------- | ------------- |
| GET    | `/api/v1/users/profile` | Get user profile    | Yes           |
| PATCH  | `/api/v1/users/profile` | Update user profile | Yes           |

### Products (Public)

| Method | Endpoint                              | Description              | Auth Required |
| ------ | ------------------------------------- | ------------------------ | ------------- |
| GET    | `/api/v1/products`                    | Get all products         | No            |
| GET    | `/api/v1/products/:productId`         | Get single product       | No            |
| GET    | `/api/v1/products/categories`         | Get product categories   | No            |
| GET    | `/api/v1/products/featured`           | Get featured products    | No            |
| GET    | `/api/v1/products/new-arrivals`       | Get new arrivals         | No            |
| GET    | `/api/v1/products/category/:category` | Get products by category | No            |

### Products (Admin)

| Method | Endpoint                            | Description                | Auth Required |
| ------ | ----------------------------------- | -------------------------- | ------------- |
| POST   | `/api/v1/products/admin/create`     | Create product             | Admin         |
| GET    | `/api/v1/products/admin/all`        | Get all products (admin)   | Admin         |
| GET    | `/api/v1/products/admin/:productId` | Get single product (admin) | Admin         |
| PATCH  | `/api/v1/products/admin/:productId` | Update product             | Admin         |
| DELETE | `/api/v1/products/admin/:productId` | Delete product             | Admin         |

### Product Reviews

| Method | Endpoint                              | Description         | Auth Required |
| ------ | ------------------------------------- | ------------------- | ------------- |
| GET    | `/api/v1/products/:productId/reviews` | Get product reviews | No            |
| POST   | `/api/v1/products/:productId/review`  | Add product review  | Yes           |

### Cart

| Method | Endpoint                         | Description           | Auth Required |
| ------ | -------------------------------- | --------------------- | ------------- |
| POST   | `/api/v1/cart/add`               | Add item to cart      | Yes           |
| GET    | `/api/v1/cart`                   | Get user's cart       | Yes           |
| PATCH  | `/api/v1/cart/update`            | Update cart item      | Yes           |
| DELETE | `/api/v1/cart/remove/:productId` | Remove item from cart | Yes           |
| DELETE | `/api/v1/cart/clear`             | Clear cart            | Yes           |

### Orders

| Method | Endpoint                        | Description           | Auth Required |
| ------ | ------------------------------- | --------------------- | ------------- |
| POST   | `/api/v1/orders/create`         | Create new order      | Yes           |
| POST   | `/api/v1/orders/payment-intent` | Create payment intent | Yes           |
| PATCH  | `/api/v1/orders/:orderId/pay`   | Update order to paid  | Yes           |
| GET    | `/api/v1/orders/my-orders`      | Get user's orders     | Yes           |
| GET    | `/api/v1/orders/:orderId`       | Get single order      | Yes           |

### Orders (Admin)

| Method | Endpoint                               | Description         | Auth Required |
| ------ | -------------------------------------- | ------------------- | ------------- |
| GET    | `/api/v1/orders/admin/all`             | Get all orders      | Admin         |
| PATCH  | `/api/v1/orders/admin/:orderId/status` | Update order status | Admin         |
| DELETE | `/api/v1/orders/admin/:orderId`        | Delete order        | Admin         |

### User Management (Admin)

| Method | Endpoint                           | Description      | Auth Required |
| ------ | ---------------------------------- | ---------------- | ------------- |
| GET    | `/api/v1/users/admin/all`          | Get all users    | Admin         |
| GET    | `/api/v1/users/admin/:userId`      | Get user by ID   | Admin         |
| DELETE | `/api/v1/users/admin/:userId`      | Delete user      | Admin         |
| PATCH  | `/api/v1/users/admin/:userId/role` | Update user role | Admin         |

## Request/Response Examples

### Register User

```json
POST /api/v1/users/register
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Create Product (Admin)

```json
POST /api/v1/products/admin/create
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "images": [file1, file2]
}
```

### Add to Cart

```json
POST /api/v1/cart/add
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Create Order

```json
POST /api/v1/orders/create
{
  "orderItems": [
    {
      "product": "product_id_here",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "stripe",
  "itemsPrice": 199.98,
  "taxPrice": 20.00,
  "shippingPrice": 10.00,
  "totalPrice": 229.98
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Authentication

Most endpoints require authentication via JWT token stored in HTTP-only cookies. Include the token in requests:

```javascript
// Token is automatically sent with cookies
fetch("/api/v1/protected-route", {
  credentials: "include",
});
```

## Payment Integration

The API integrates with Stripe for payment processing:

1. Create payment intent: `POST /api/v1/orders/payment-intent`
2. Process payment on frontend using Stripe Elements
3. Update order status: `PATCH /api/v1/orders/:orderId/pay`

## File Upload

Product images are uploaded to Cloudinary:

- Supported formats: JPG, PNG, GIF
- Maximum 5 images per product
- Automatic optimization and CDN delivery

## Database Models

### User

- fullname, email, password, role, timestamps

### Product

- name, description, price, images, category, stock, ratings, reviews, createdBy, timestamps

### Cart

- user, items (product, quantity, price), totalAmount, timestamps

### Order

- user, orderItems, shippingAddress, paymentMethod, paymentResult, pricing, status, timestamps

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration
- HTTP-only cookies for tokens

## Development

### Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server (if nodemon is installed)
```

### Environment Variables

Make sure to set all required environment variables in your `.env` file before running the application.

## License

This project is licensed under the ISC License.
