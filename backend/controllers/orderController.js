//This is orderController, which handles the logic for creating and processing orders & sending emails for order updates.

import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/userModel.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Creating a new order
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
    orderItems: orderItems.map(item => ({ ...item, product: item.product })), // Ensure product ID is linked
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  const user = await User.findById(req.user._id);

  // Send email (this part is good)
  await sendEmail({
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h3>Hi ${user.name},</h3>
      <p>Thank you for shopping with <strong>ShopVerse</strong>!</p>
      <p>Your order <strong>#${order._id}</strong> has been received and is now being processed.</p>
    `,
  });

  // IMPORTANT: Send back the full createdOrder object
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
// payOrder controller
// Update order to paid
export const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Find the user for their email
  const user = await User.findById(order.user);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    ui_mode: "embedded", // KEY CHANGE 1: Enable embedded mode
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name, images: [item.image] },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    customer_email: user.email, // Good to pre-fill email
    metadata: {
      orderId: order._id.toString(),
    },
    // KEY CHANGE 2: 'return_url' is required for embedded mode
    return_url: `${process.env.FRONTEND_URL}/order/${order._id}?success=true`,
    // You can remove the 'cancel_url' as the user won't leave the page
  });

  // KEY CHANGE 3: Send back the client_secret from the session
  res.json({ clientSecret: session.client_secret });
});
