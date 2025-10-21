import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchProfile } from "../redux/slices/userSlice";
import api from "../utils/api";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [profilePic, setProfilePic] = useState(userInfo?.avatar || "");
  const [addresses, setAddresses] = useState(userInfo?.addresses || []);
  // eslint-disable-next-line no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    const loadProfileAndOrders = async () => {
      await dispatch(fetchProfile());
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    loadProfileAndOrders();
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setProfilePic(userInfo.avatar || "");
      setAddresses(userInfo.addresses || []);
    }
  }, [userInfo]);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const spendingTrend = orders.slice(-5).map((order) => ({
    name: new Date(order.createdAt).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    total: order.totalPrice,
  }));

  const handleImageUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dh1llydjj",
        uploadPreset: "shopverse_preset",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setProfilePic(result.info.secure_url);
        }
      }
    );
    widget.open();
  };
  const handleProfileUpdate = async () => {
    try {
      setUploading(true);
      await api.put("/users/profile", {
        name: updatedName || userInfo.name,
        email: updatedEmail || userInfo.email,
        avatar: profilePic,
      });
      await dispatch(fetchProfile()); 
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  const handleAddAddress = async () => {
    const newAddr = prompt("Enter new address:");
    if (!newAddr?.trim()) return;

    try {
      const { data } = await api.put("/users/address", { address: newAddr });
      setAddresses(data); 
      await dispatch(fetchProfile()); 
    } catch (err) {
      console.error("Add address failed:", err);
      alert("Failed to add address");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10 sm:px-8">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
        My Profile
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-blue-500/20"
        >
          <img
            src={
              profilePic ||
              "https://res.cloudinary.com/dh1llydjj/image/upload/v1728912922/default-avatar.jpg"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-500/40"
          />
          <button
            onClick={handleImageUpload}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm mb-4"
          >
            Change Photo
          </button>

          <input
            type="text"
            placeholder={userInfo?.name}
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="bg-gray-900 border border-gray-700 p-2 rounded w-full mb-3 text-gray-100"
          />
          <input
            type="email"
            placeholder={userInfo?.email}
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            className="bg-gray-900 border border-gray-700 p-2 rounded w-full mb-3 text-gray-100"
          />

          <button
            onClick={handleProfileUpdate}
            disabled={uploading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 rounded-lg font-semibold hover:opacity-90"
          >
            {uploading ? "Saving..." : "Save Changes"}
          </button>

          <hr className="my-6 border-gray-700 w-full" />

          <p className="text-gray-400 text-sm">
            Member since:{" "}
            <span className="text-blue-400 font-medium">
              {userInfo?.createdAt
                ? new Date(userInfo.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Account Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/70 p-4 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-blue-400">
                {totalOrders}
              </h3>
            </div>
            <div className="bg-gray-900/70 p-4 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Total Spent</p>
              <h3 className="text-2xl font-bold text-green-400">
                ${totalSpent.toFixed(2)}
              </h3>
            </div>
            <div className="bg-gray-900/70 p-4 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Last Order</p>
              <h3 className="text-base font-medium text-gray-200">
                {orders.length > 0
                  ? new Date(
                      orders[orders.length - 1].createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </h3>
            </div>
            <div className="bg-gray-900/70 p-4 rounded-lg text-center">
              <p className="text-gray-400 text-sm">Payment Method</p>
              <h3 className="text-base font-medium text-indigo-400">
                {paymentMethod}
              </h3>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-200 mb-3">
            Spending Trend
          </h3>
          <div className="w-full h-64 bg-gray-900/60 rounded-lg p-3">
            {spendingTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      color: "#E5E7EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#3B82F6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Not enough data for chart yet 📊
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-5xl mx-auto mt-10 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-blue-500/20"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-400">
            Saved Addresses
          </h2>
          <button
            onClick={handleAddAddress}
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            + Add New
          </button>
        </div>

        {addresses.length > 0 ? (
          <ul className="space-y-3">
            {addresses.map((addr, i) => (
              <li
                key={i}
                className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
              >
                <p className="text-gray-300">{addr}</p>
                <button
onClick={async () => {
  const confirmDelete = window.confirm("Are you sure you want to remove this address?");
  if (!confirmDelete) return;

  try {
    const { data } = await api.delete("/users/address", {
      data: { address: addr },
    });
    setAddresses(data); 
    await dispatch(fetchProfile()); 
  } catch (err) {
    console.error("Delete address failed:", err);
    alert("Failed to delete address");
  }
}}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No saved addresses yet.</p>
        )}
      </motion.div>
    </div>
  );
}
