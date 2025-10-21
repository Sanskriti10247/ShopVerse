//product data , used to seed the database
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

dotenv.config();
connectDB();

const products = [
    {
      name: "Classic T-Shirt",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761030276/classictshirt_ghiedj.jpg",
      description: "Soft cotton unisex t-shirt available in all sizes.",
      brand: "H&M",
      category: "Apparel",
      price: 19.99,
      countInStock: 20,
    },
    {
      name: "Noise Cancelling Headphones",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029979/noisecancellationheadphones_fhmphr.jpg",
      description: "Wireless over-ear headphones with deep bass.",
      brand: "Sony",
      category: "Electronics",
      price: 149.99,
      countInStock: 10,
    },
    {
      name: "Smartwatch Pro",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761030130/smartwatch_dztixr.webp",
      description: "Track your fitness, heart rate, and notifications.",
      brand: "Apple",
      category: "Electronics",
      price: 299.99,
      countInStock: 15,
    },
    {
      name: "Lego Space Shuttle",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029980/legospaceshuttle_ttfvgb.jpg",
      description: "Build your own space shuttle with 500+ pieces.",
      brand: "Lego",
      category: "Toys",
      price: 59.99,
      countInStock: 8,
    },
    {
      name: "Rubik’s Cube 3x3",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029979/rubicscube_elzzla.webp",
      description: "World’s most popular puzzle toy — master your moves!",
      brand: "Rubik",
      category: "Toys",
      price: 9.99,
      countInStock: 30,
    },
    {
      name: "Wall Clock",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029980/wallclock_aqmfcs.jpg",
      description: "Modern minimalistic wall clock for your home.",
      brand: "IKEA",
      category: "Home Decor",
      price: 25.99,
      countInStock: 12,
    },
    {
      name: "Table Lamp",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761030130/tablelamp_dfqfnk.jpg",
      description: "Elegant bedside lamp with soft warm lighting.",
      brand: "Philips",
      category: "Home Decor",
      price: 35.0,
      countInStock: 18,
    },
    {
      name: "Comfy Hoodie",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029979/comfyhoodie_e5m4yw.jpg",
      description: "Warm, comfortable hoodie for everyday wear.",
      brand: "Nike",
      category: "Apparel",
      price: 39.99,
      countInStock: 25,
    },
    {
      name: "Denim Jeans",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029979/denimjeans_oxc55a.webp",
      description: "Classic blue denim jeans with slim fit design.",
      brand: "Levi’s",
      category: "Apparel",
      price: 49.99,
      countInStock: 20,
    },
    {
      name: "Drone Mini 2",
      image: "https://res.cloudinary.com/dh1llydjj/image/upload/v1761029979/dronemini_xsys3n.jpg",
      description: "Compact drone with 4K camera and easy controls.",
      brand: "DJI",
      category: "Toys",
      price: 399.99,
      countInStock: 5,
    },
  ];
  
  

const seedProducts = async () => {
  try {
    
    await Product.deleteMany();

    const users = await User.find({});
    const adminUser = users[0]._id;

    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
