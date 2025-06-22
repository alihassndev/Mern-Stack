# 🚀 Quick Startup Guide

## 1. Create Environment File

Create a `.env` file in the root directory with the following content:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017
DB_NAME=ecommerce_db

# JWT Configuration
TOKEN_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# CORS Configuration
ORIGIN=http://localhost:3000

# Optional: Cloudinary Configuration (for image uploads)
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Optional: Stripe Configuration (for payments)
# STRIPE_SECRET_KEY=your_stripe_secret_key
# STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start MongoDB

Make sure MongoDB is running on your system. If you don't have MongoDB installed:

### Windows:

- Download and install MongoDB Community Server
- Start MongoDB service

### macOS:

```bash
brew install mongodb-community
brew services start mongodb-community
```

### Linux:

```bash
sudo systemctl start mongod
```

## 4. Start the Server

```bash
npm start
```

## 5. Verify Installation

You should see output like:

```
🌱 Starting database seeding...
✅ Admin user created: admin@example.com
✅ Regular user created: user@example.com
✅ Sample products created
🎉 Database seeding completed successfully!

📋 Sample Login Credentials:
👤 Admin: admin@example.com / admin123
👤 User: user@example.com / user123

🔗 API Base URL: http://localhost:8000/api/v1
🚀 Server is running on port: 8000
📱 API Base URL: http://localhost:8000/api/v1
🌐 Environment: development
```

## 6. Test the API

### Test the base endpoint:

```bash
curl http://localhost:8000/
```

Should return: `Ecommerce Backend API is running...`

### Test products endpoint:

```bash
curl http://localhost:8000/api/v1/products
```

Should return a JSON response with sample products.

## 7. Optional: Configure External Services

### Cloudinary (for image uploads):

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Uncomment and fill in the Cloudinary variables in `.env`

### Stripe (for payments):

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Uncomment and fill in the Stripe variables in `.env`

## 8. API Testing

### Using Postman:

1. Import the collection from `API_DOCUMENTATION.md`
2. Set base URL: `http://localhost:8000/api/v1`
3. Test the endpoints

### Using curl:

```bash
# Register a user
curl -X POST http://localhost:8000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:8000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt

# Get products (using saved cookies)
curl http://localhost:8000/api/v1/products \
  -b cookies.txt
```

## Troubleshooting

### MongoDB Connection Error:

- Make sure MongoDB is running
- Check if the connection string is correct
- Try: `mongodb://127.0.0.1:27017` instead of `mongodb://localhost:27017`

### Port Already in Use:

- Change the PORT in `.env` file
- Or kill the process using the port

### Module Not Found:

- Run `npm install` again
- Check if all dependencies are installed

### Stripe/Cloudinary Errors:

- These are optional services
- The app will work without them
- Check the console for warnings about missing configuration

## Next Steps

1. **Frontend Development**: Connect your frontend to these APIs
2. **Payment Integration**: Set up Stripe for real payments
3. **Image Upload**: Configure Cloudinary for product images
4. **Production**: Update environment variables for production deployment

## Support

If you encounter any issues:

1. Check the console output for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Check the API documentation for endpoint details
