# Ecommerce API Documentation

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

All protected endpoints require a JWT token stored in HTTP-only cookies. The token is automatically sent with requests when using `credentials: 'include'`.

## Quick Start

### 1. Register a User

```bash
curl -X POST http://localhost:8000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get Products (Public)

```bash
curl http://localhost:8000/api/v1/products
```

## Detailed Endpoints

### Authentication Endpoints

#### Register User

- **URL**: `POST /users/register`
- **Description**: Register a new user
- **Body**:
  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully.",
    "user": {
      "_id": "user_id",
      "fullname": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

#### Login

- **URL**: `POST /users/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully."
  }
  ```

### Product Endpoints

#### Get All Products

- **URL**: `GET /products`
- **Description**: Get all products with pagination and filtering
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `category` (optional): Filter by category
  - `search` (optional): Search by product name
  - `minPrice` (optional): Minimum price filter
  - `maxPrice` (optional): Maximum price filter
  - `sort` (optional): Sort by (price_asc, price_desc, rating, newest)

#### Get Single Product

- **URL**: `GET /products/:productId`
- **Description**: Get details of a specific product

#### Get Product Categories

- **URL**: `GET /products/categories`
- **Description**: Get all available product categories

### Cart Endpoints (Protected)

#### Add to Cart

- **URL**: `POST /cart/add`
- **Description**: Add a product to user's cart
- **Body**:
  ```json
  {
    "productId": "product_id_here",
    "quantity": 2
  }
  ```

#### Get Cart

- **URL**: `GET /cart`
- **Description**: Get user's current cart

#### Update Cart Item

- **URL**: `PATCH /cart/update`
- **Description**: Update quantity of an item in cart
- **Body**:
  ```json
  {
    "productId": "product_id_here",
    "quantity": 3
  }
  ```

#### Remove from Cart

- **URL**: `DELETE /cart/remove/:productId`
- **Description**: Remove an item from cart

### Order Endpoints (Protected)

#### Create Order

- **URL**: `POST /orders/create`
- **Description**: Create a new order from cart items
- **Body**:
  ```json
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
    "taxPrice": 20.0,
    "shippingPrice": 10.0,
    "totalPrice": 229.98
  }
  ```

#### Create Payment Intent

- **URL**: `POST /orders/payment-intent`
- **Description**: Create Stripe payment intent
- **Body**:
  ```json
  {
    "amount": 229.98
  }
  ```

#### Get My Orders

- **URL**: `GET /orders/my-orders`
- **Description**: Get all orders for the authenticated user

### Admin Endpoints (Admin Only)

#### Create Product

- **URL**: `POST /products/admin/create`
- **Description**: Create a new product (admin only)
- **Content-Type**: `multipart/form-data`
- **Body**:
  ```
  name: "Product Name"
  description: "Product description"
  price: 99.99
  category: "Electronics"
  stock: 50
  images: [file1, file2]
  ```

#### Get All Orders (Admin)

- **URL**: `GET /orders/admin/all`
- **Description**: Get all orders in the system

#### Update Order Status (Admin)

- **URL**: `PATCH /orders/admin/:orderId/status`
- **Description**: Update order status
- **Body**:
  ```json
  {
    "status": "shipped"
  }
  ```

## Testing with Postman

### 1. Setup Collection

Create a new Postman collection and set the base URL variable:

```
{{baseUrl}} = http://localhost:8000/api/v1
```

### 2. Authentication Flow

1. **Register User**: `POST {{baseUrl}}/users/register`
2. **Login**: `POST {{baseUrl}}/users/login`
3. **Use in subsequent requests**: Postman will automatically handle cookies

### 3. Test Product Flow

1. **Get Products**: `GET {{baseUrl}}/products`
2. **Get Single Product**: `GET {{baseUrl}}/products/:productId`
3. **Add to Cart**: `POST {{baseUrl}}/cart/add`
4. **Get Cart**: `GET {{baseUrl}}/cart`
5. **Create Order**: `POST {{baseUrl}}/orders/create`

### 4. Admin Flow

1. **Login as Admin**: Use admin credentials
2. **Create Product**: `POST {{baseUrl}}/products/admin/create`
3. **Get All Orders**: `GET {{baseUrl}}/orders/admin/all`

## Sample Data

The application comes with sample data:

### Admin User

- Email: `admin@example.com`
- Password: `admin123`

### Regular User

- Email: `user@example.com`
- Password: `user123`

### Sample Products

- Wireless Bluetooth Headphones ($99.99)
- Smart Fitness Watch ($199.99)
- Organic Cotton T-Shirt ($29.99)
- Stainless Steel Water Bottle ($24.99)
- Professional Camera Lens ($599.99)

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Environment Variables

Make sure to set up your `.env` file with the following variables:

```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017
DB_NAME=ecommerce_db
TOKEN_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
ORIGIN=http://localhost:3000
```

## Frontend Integration

### JavaScript/Fetch Example

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Get Products
const getProducts = async () => {
  const response = await fetch("http://localhost:8000/api/v1/products", {
    credentials: "include",
  });
  return response.json();
};

// Add to Cart
const addToCart = async (productId, quantity) => {
  const response = await fetch("http://localhost:8000/api/v1/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
};
```

### React Example

```jsx
import { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8000/api/v1/products", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```
