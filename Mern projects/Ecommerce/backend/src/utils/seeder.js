import { User } from "../model/user.model.js";
import { Product } from "../model/product.model.js";
import "dotenv/config";

// Sample products data with placeholder images
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    price: 99.99,
    category: "Electronics",
    stock: 50,
    images: [
      {
        public_id: "sample_public_id_1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
    ],
    ratings: 4.5,
    numOfReviews: 12,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracking watch with heart rate monitor and GPS.",
    price: 199.99,
    category: "Electronics",
    stock: 30,
    images: [
      {
        public_id: "sample_public_id_2",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
    ],
    ratings: 4.2,
    numOfReviews: 8,
  },
  {
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and eco-friendly cotton t-shirt available in multiple colors.",
    price: 29.99,
    category: "Clothing",
    stock: 100,
    images: [
      {
        public_id: "sample_public_id_3",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      },
    ],
    ratings: 4.0,
    numOfReviews: 25,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24 hours.",
    price: 24.99,
    category: "Home & Garden",
    stock: 75,
    images: [
      {
        public_id: "sample_public_id_4",
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      },
    ],
    ratings: 4.7,
    numOfReviews: 15,
  },
  {
    name: "Professional Camera Lens",
    description: "High-quality camera lens for professional photography.",
    price: 599.99,
    category: "Electronics",
    stock: 10,
    images: [
      {
        public_id: "sample_public_id_5",
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      },
    ],
    ratings: 4.8,
    numOfReviews: 6,
  },
];

// Sample admin user
const sampleAdmin = {
  fullname: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
};

// Sample regular user
const sampleUser = {
  fullname: "John Doe",
  email: "user@example.com",
  password: "user123",
  role: "user",
};

// Seeder function
export const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const admin = await User.create(sampleAdmin);
      console.log("✅ Admin user created:", admin.email);
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    // Check if regular user already exists
    const existingUser = await User.findOne({ email: sampleUser.email });
    if (!existingUser) {
      const user = await User.create(sampleUser);
      console.log("✅ Regular user created:", user.email);
    } else {
      console.log("ℹ️ Regular user already exists");
    }

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      // Get admin user for product creation
      const admin = await User.findOne({ role: "admin" });

      // Create products with admin as creator
      const productsWithCreator = sampleProducts.map((product) => ({
        ...product,
        createdBy: admin._id,
      }));

      await Product.insertMany(productsWithCreator);
      console.log("✅ Sample products created");
    } else {
      console.log("ℹ️ Products already exist");
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📋 Sample Login Credentials:");
    console.log("👤 Admin: admin@example.com / admin123");
    console.log("👤 User: user@example.com / user123");
    console.log("\n🔗 API Base URL: http://localhost:8000/api/v1");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Export for use in index.js
export default seedDatabase;
