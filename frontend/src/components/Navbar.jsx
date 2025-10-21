import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { resetCartState, clearCart } from "../redux/slices/cartSlice";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  ListOrdered,
  CreditCard,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navShadow, setNavShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavShadow(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setShowMenu(false);
    setMobileMenu(false);
    dispatch(logout());
    dispatch(resetCartState());
    navigate("/", { replace: true });
  };

  const handleClearSavedCart = () => {
    dispatch(clearCart());
    setShowMenu(false);
    setMobileMenu(false);
    toast.success("🧹 Your saved cart has been cleared!");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 backdrop-blur-lg border-b border-gray-700/50 
      transition-all duration-500 ${
        navShadow
          ? "bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-950/95 shadow-lg"
          : "bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-gray-950/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold tracking-wide 
            bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
            bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] 
            flex items-center gap-2 transition-all duration-300"
          >
            🛒 ShopVerse
          </Link>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-300 hover:text-cyan-400 transition"
          onClick={() => setMobileMenu((prev) => !prev)}
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </motion.button>

        <div className="hidden md:flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.15 }}>
            <Link to="/cart" className="relative">
              <ShoppingCart
                size={24}
                className="text-gray-300 hover:text-cyan-400 transition-all duration-200"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-cyan-500 text-white text-xs rounded-full px-2 shadow">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </motion.div>

          {userInfo ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-all duration-200"
              >
                <User size={24} />
              </motion.button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-gray-900/95 border border-gray-700/80 
                    rounded-lg shadow-2xl p-2 text-gray-300 backdrop-blur-md"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800/80 rounded transition"
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800/80 rounded transition"
                    >
                      <ListOrdered size={16} /> My Orders
                    </Link>
                    <Link
                      to="/payments"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800/80 rounded transition"
                    >
                      <CreditCard size={16} /> Payments
                    </Link>

                    <button
                      onClick={handleClearSavedCart}
                      className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-800/80 rounded text-gray-300"
                    >
                      <Trash2 size={16} /> Clear Saved Cart
                    </button>

                    <hr className="my-2 border-gray-700" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-800/80 rounded text-red-400 font-medium"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/register"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded font-medium transition-all duration-200 border border-gray-700"
                >
                  Register
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded font-medium transition-all duration-200 shadow-md"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 border-t border-gray-800/80 
            shadow-inner py-4 px-6 space-y-3 text-gray-300 backdrop-blur-md"
          >
            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block hover:text-cyan-400 transition"
            >
              Home
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenu(false)}
              className="block hover:text-cyan-400 transition"
            >
              Cart ({cartItems.length})
            </Link>

            {userInfo ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="block hover:text-cyan-400 transition"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenu(false)}
                  className="block hover:text-cyan-400 transition"
                >
                  My Orders
                </Link>
                <Link
                  to="/payments"
                  onClick={() => setMobileMenu(false)}
                  className="block hover:text-cyan-400 transition"
                >
                  Payments
                </Link>
                <button
                  onClick={handleClearSavedCart}
                  className="block w-full text-left hover:text-cyan-400 transition"
                >
                  Clear Saved Cart
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="block hover:text-cyan-400 transition"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="block hover:text-cyan-400 transition"
                >
                  Login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
