import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
    const timer = setTimeout(() => navigate("/"), 4000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 text-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10 max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>

        <p className="text-base sm:text-lg text-gray-700 mb-3 leading-relaxed">
          Thank you for your order! 🎉 Your payment has been processed
          successfully.
        </p>

        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Redirecting you to the homepage...
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm sm:text-base transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
