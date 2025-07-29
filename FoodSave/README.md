# 🍽️ FoodSave - Food Donation Platform

A full-stack web application that connects food donors with NGOs to reduce food waste and help those in need.

## 🚀 Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Food Donations**: Donors can create and manage food donations
- **Pickup Requests**: NGOs can request pickups for available donations
- **Real-time Tracking**: Live location updates for pickup tracking
- **Admin Dashboard**: Comprehensive admin panel for platform management
- **Guidelines**: Food safety and donation guidelines
- **Feedback System**: User feedback and rating system

## 🛠️ Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Cloudinary** for image uploads
- **Twilio** for SMS notifications
- **Nodemailer** for email notifications

### Frontend

- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Socket.io Client** for real-time updates

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- Git

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd FoodSave
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/foodsave
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 📁 Project Structure

```
FoodSave/
├── backend/
│   ├── src/
│   │   ├── controller/     # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── model/         # Database models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   ├── app.js         # Express app setup
│   │   └── index.js       # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

Make sure to configure all required environment variables in the backend `.env` file. See `backend/envPattern.txt` for the complete list.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@foodsave.com or create an issue in the repository.
