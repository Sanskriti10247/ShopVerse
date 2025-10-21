import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!userInfo?.token) {
          setError("Please log in to view your payments.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5001/api/payments/my",
          config
        );
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load your payment records. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userInfo]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10 animate-pulse">
        Loading your payment history...
      </p>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
        <div className="bg-gray-800/80 border border-gray-700 p-8 rounded-2xl shadow-lg text-center max-w-md">
          <p className="text-red-400 font-medium mb-2">{error}</p>
          <p className="text-gray-400 text-sm">
            If this issue continues, please log out and log back in.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
        My Payments
      </h1>

      {payments.length === 0 ? (
        <p className="text-center text-gray-400">
          No payment records found 💳
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-blue-500/30"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{p.method}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    p.status === "Success"
                      ? "bg-green-600/70 text-green-100"
                      : p.status === "Pending"
                      ? "bg-yellow-600/70 text-yellow-100"
                      : "bg-red-600/70 text-red-100"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-blue-400">Amount:</span>{" "}
                ${p.amount.toFixed(2)}
              </p>

              <p className="text-gray-400 text-sm mb-1">
                Transaction ID:{" "}
                <span className="text-gray-200">{p.transactionId || "N/A"}</span>
              </p>

              <p className="text-gray-400 text-sm">
                Date:{" "}
                <span className="text-gray-200">
                  {new Date(p.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>

              <hr className="my-4 border-gray-700" />

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Payment Type</p>
                <p className="text-indigo-400 font-semibold">
                  {p.method || "Card"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
