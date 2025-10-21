import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("❌ Payment cancelled");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gray-50 px-4 sm:px-6 text-center">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 max-w-sm sm:max-w-md md:max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-red-600">
          Payment Cancelled
        </h2>

        <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
          Your payment was not completed. You can try again or go back to your cart to review your items.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm sm:text-base transition"
          >
            Back to Cart
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
