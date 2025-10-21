//This is orderController, which handles the logic for creating and processing orders & sending emails for order updates.

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
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  const user = await User.findById(req.user._id);
await sendEmail({
  to: user.email,
  subject: `Order Confirmation - ${order._id}`,
  html: `
    <h3>Hi ${user.name},</h3>
    <p>Thank you for shopping with <strong>ShopVerse</strong>!</p>
    <p>Your order <strong>#${order._id}</strong> has been received and is now being processed.</p>
    <p><strong>Total:</strong> $${order.totalPrice}</p>
    <p>We’ll notify you when it ships 🚚</p>
  `,
});

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

  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    payment_method_types: ["card"],
    mode: "payment",
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name, images: [item.image] },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    return_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.json({ clientSecret: session.client_secret });
});

  