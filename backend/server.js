import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  "https://shopverse-frontend-eta.vercel.app",
  "http://localhost:5173",
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("ShopVerse API is running...");
});

io.on("connection", (socket) => {
  console.log("⚡️ Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

setInterval(() => {
  io.emit("ping", { time: new Date().toISOString() });
}, 5000);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Server running with Socket.IO on port ${PORT}`);
});

export { io };
