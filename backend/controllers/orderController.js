import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Creating a new order
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({ ...item, product: item.product })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  
  // ** FIX 1: EMAIL CALL REMOVED FROM HERE **
  // We will send the email in the 'payOrder' step.

  // Send back the full createdOrder object
  res.status(201).json(createdOrder);
});

// Get logged-in user's orders
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Get order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order to paid
export const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Find the user for email and Stripe
  const user = await User.findById(order.user);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    
    // ** FIX 2: THIS LINE IS REQUIRED FOR EMBEDDED CHECKOUT **
    ui_mode: "embedded", 
    
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name, images: [item.image] },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    customer_email: user.email,
    metadata: {
      orderId: order._id.toString(),
    },
    return_url: `${process.env.FRONTEND_URL}/order/${order._id}?success=true`,
  });

  // 1. Send the email from here
  const emailUrl = await sendEmail({
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h3>Hi ${user.name},</h3>
      <p>Thank you for shopping with <strong>ShopVerse</strong>!</p>
      <p>Your order <strong>#${order._id}</strong> has been received and is now being processed.</p>
    `,
  });

  // 2. Send back the clientSecret AND the test email URL
  res.json({
    clientSecret: session.client_secret,
    emailUrl: emailUrl, // Add this line
  });
});