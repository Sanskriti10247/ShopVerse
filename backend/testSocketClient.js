import { io } from "socket.io-client";


const socket = io("http://localhost:5001", {
  transports: ["websocket"], 
});
socket.on("connect", () => {
  console.log("✅ Connected to backend Socket.IO:", socket.id);
});
socket.on("userRegistered", (data) => {
  console.log("🆕 userRegistered event received:", data);
});
socket.on("ping", (data) => {
  console.log("📡 Ping from server:", data);
});
socket.on("disconnect", () => {
  console.log("❌ Disconnected from backend Socket.IO");
});
