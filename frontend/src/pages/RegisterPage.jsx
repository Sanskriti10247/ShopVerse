import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-6 sm:p-8 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg transition-all"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-gray-600 text-sm sm:text-base text-center mb-6">
          Join <span className="font-semibold text-blue-600">ShopVerse</span> and start shopping!
        </p>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="border border-gray-300 p-2 sm:p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="border border-gray-300 p-2 sm:p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="border border-gray-300 p-2 sm:p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
