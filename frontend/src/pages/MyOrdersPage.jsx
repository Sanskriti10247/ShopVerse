import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.user); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userInfo?.token) {
          setError("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5001/orders/myorders",
          config
        );

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
        setError(
          err.response?.data?.message ||
            "Failed to load your orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10 animate-pulse">
        Loading your orders...
      </p>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
        <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl shadow-lg text-center max-w-md">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <p className="text-gray-400 text-sm">
            If the issue persists, please log out and log in again.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found 😢</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-blue-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`mt-3 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                    order.isDelivered
                      ? "bg-green-600/70 text-green-100"
                      : "bg-yellow-600/70 text-yellow-100"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              <div className="space-y-3">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-900/60 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded object-cover border border-gray-700"
                      />
                      <p className="font-medium text-gray-200 text-sm sm:text-base">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm mb-2 sm:mb-0">
                  Payment:{" "}
                  <span
                    className={`font-medium ${
                      order.isPaid ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
                <p className="text-blue-400 font-semibold text-lg">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
