//This is userController, which handles the logic for creating users.
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import { io } from "../server.js";


//Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    io.emit("userRegistered", {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token: generateToken(res, user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// Login a user- Token to be taken from here for postman check 
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      addresses: user.addresses,
      createdAt: user.createdAt,
      token: generateToken(res, user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
      addresses: user.addresses || [],
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


//User profile to be updated 
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.avatar) user.avatar = req.body.avatar;

    const updatedUser = await user.save();
    await sendEmail({
      to: user.email,
      subject: "Profile Updated ✔️",
      html: `
        <h3>Hi ${user.name},</h3>
        <p>Your ShopVerse profile details were recently updated.</p>
        <p>If this wasn’t you, please contact support immediately.</p>
      `,
    });
    

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      addresses: updatedUser.addresses,
      createdAt: updatedUser.createdAt,
      token: generateToken(res, updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Add a new address
export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { address } = req.body;
  if (!address || !address.trim()) {
    res.status(400);
    throw new Error("Address field is required");
  }

  user.addresses.push(address);
  await user.save();
  await sendEmail({
    to: user.email,
    subject: "New Address Added 🏠",
    html: `
      <h3>Hi ${user.name},</h3>
      <p>A new address was added to your ShopVerse account:</p>
      <blockquote>${address}</blockquote>
      <p>If you didn’t add this, please contact support immediately.</p>
    `,
  });
  
  res.status(200).json(user.addresses);
});

//Deleting the address
export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { address } = req.body;
  if (!address) {
    res.status(400);
    throw new Error("Address is required for deletion");
  }

  // Remove matching address
  user.addresses = user.addresses.filter((a) => a !== address);
  await user.save();
  await sendEmail({
    to: user.email,
    subject: "Address Removed ⚠️",
    html: `
      <h3>Hi ${user.name},</h3>
      <p>The following address was removed from your ShopVerse account:</p>
      <blockquote>${address}</blockquote>
      <p>If you didn’t remove this, please contact support immediately.</p>
    `,
  });
  

  res.status(200).json(user.addresses); 
});
