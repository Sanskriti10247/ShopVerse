import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const searchInputRef = useRef(null);

  const hasAnimatedRef = useRef(false);
  // eslint-disable-next-line no-unused-vars
  const [shouldAnimate, setShouldAnimate] = useState(!hasAnimatedRef.current);
  useEffect(() => {
    if (!hasAnimatedRef.current) hasAnimatedRef.current = true;
  }, []);

  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 1.5,
      })),
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    dispatch(fetchProducts({ keyword: debouncedSearch, category, maxPrice, sort }));
  }, [dispatch, debouncedSearch, category, sort, maxPrice]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        const { data } = await axios.get("http://localhost:5001/products");
        const filtered = data
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Suggestion fetch failed", err);
      }
    };
    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
    setSearch("");
  };

  const grouped = products.reduce((acc, p) => {
    (acc[p.category] = acc[p.category] || []).push(p);
    return acc;
  }, {});

  const getCartQty = (id) => {
    const item = cartItems.find((i) => i.product === id);
    return item ? item.qty : 0;
  };

  const handleQtyChange = (product, type) => {
    const currentQty = getCartQty(product._id);
    if (type === "add" && currentQty === 0) {
      dispatch(addToCart({ ...product, qty: 1, product: product._id }));
    } else if (type === "inc") {
      if (currentQty < product.countInStock) {
        dispatch(addToCart({ ...product, qty: currentQty + 1, product: product._id }));
      } else {
        toast.warn(`⚠️ Only ${product.countInStock} items in stock!`, {
          position: "bottom-right",
          autoClose: 2500,
        });
      }
    } else if (type === "dec" && currentQty > 1) {
      dispatch(addToCart({ ...product, qty: currentQty - 1, product: product._id }));
    } else if (type === "dec" && currentQty === 1) {
      dispatch(addToCart({ ...product, qty: 0, product: product._id }));
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-400">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0 } : {}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-6 md:px-10 py-10 overflow-x-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-30"></div>
      </motion.div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
          initial={{ x: p.x, y: p.y, scale: p.scale }}
          animate={{
            y: [p.y, Math.random() * window.innerHeight],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.section
        initial={shouldAnimate ? { opacity: 0, y: -40 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16 sm:mb-20 relative px-3 sm:px-0"
      >
        {userInfo && (
          <motion.h1
            initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 sm:mb-4 
            bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-transparent bg-clip-text 
            flex justify-center items-center gap-2 leading-tight"
          >
            Hi, <span className="text-cyan-400">{userInfo.name}</span>
            <motion.span
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-5xl sm:text-6xl ml-2 text-yellow-400 inline-block origin-bottom"
            >
              👋
            </motion.span>
          </motion.h1>
        )}

<motion.h2
  initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 1 }}
  className="font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
  text-transparent bg-clip-text drop-shadow-lg mb-4 sm:mb-6 
  text-[clamp(1.5rem,5vw,3rem)] sm:text-5xl md:text-6xl lg:text-7xl 
  leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
>
  Welcome to{" "}
  <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
    ShopVerse
  </span>
</motion.h2>

        <p className="text-gray-300 text-center mx-auto text-base sm:text-lg md:text-xl mb-8 sm:mb-10 
          leading-snug tracking-tight max-w-[90vw] sm:max-w-2xl px-2">
          Discover the latest trends, hottest gadgets, and stylish essentials ✨
        </p>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 25px rgba(99,102,241,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold shadow-lg transition-all text-base sm:text-lg animate-pulse-slow"
        >
          <span className="relative z-10">Start Shopping</span>
        </motion.button>
      </motion.section>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 40 } : {}}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mb-12 
        bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-xl border border-gray-700 
        relative overflow-visible" 
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-lg -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <div className="relative w-full sm:w-auto z-50"> 
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => search && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="border border-gray-600 bg-gray-900 text-gray-100 p-2 rounded w-full sm:w-64 
            focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-gray-900 border border-gray-700 rounded shadow-md w-full sm:w-64 mt-1 max-h-56 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s._id}
                  onClick={() => handleSuggestionClick(s._id)}
                  className="px-3 py-2 hover:bg-gray-800 cursor-pointer transition"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-600 bg-gray-900 text-gray-100 p-2 rounded w-full sm:w-48"
        >
          <option value="">All Categories</option>
          <option value="Apparel">👕 Apparel</option>
          <option value="Shoes">👟 Shoes</option>
          <option value="Electronics">📱 Electronics</option>
          <option value="Home Decor">🏠 Home Decor</option>
          <option value="Beauty">💄 Beauty</option>
          <option value="Accessories">🎒 Accessories</option>
          <option value="Toys">🧸 Toys</option>
        </select>

        <div className="flex flex-col items-center w-full sm:w-64">
          <label className="text-gray-300 text-sm mb-2 font-medium">
            Price up to: <span className="font-semibold text-blue-400">${maxPrice}</span>
          </label>
          <Slider
            min={0}
            max={5000}
            step={50}
            value={maxPrice}
            onChange={setMaxPrice}
            trackStyle={[{ backgroundColor: "#60a5fa", height: 6 }]}
            handleStyle={{
              borderColor: "#3b82f6",
              height: 20,
              width: 20,
              backgroundColor: "#3b82f6",
            }}
            railStyle={{ backgroundColor: "#1f2937", height: 6 }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-600 bg-gray-900 text-gray-100 p-2 rounded w-full sm:w-44"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setMaxPrice(5000);
            setSort("");
            searchInputRef.current?.focus();
          }}
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 
          text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Clear Filters
        </button>
      </motion.div>

      {Object.keys(grouped).length > 0 ? (
        Object.keys(grouped).map((category) => (
          <div key={category} className="mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text"
            >
              {category}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {grouped[category].map((p) => {
                const qty = getCartQty(p._id);
                return (
                  <motion.div
                    key={p._id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-blue-500/30 overflow-hidden flex flex-col transition"
                  >
                    <Link to={`/product/${p._id}`}>
                      <img
                        src={
                          p.image ||
                          "https://res.cloudinary.com/dh1llydjj/image/upload/v1728912922/default-placeholder.jpg"
                        }
                        alt={p.name}
                        className="h-56 w-full object-cover hover:opacity-90 transition"
                      />
                    </Link>

                    <div className="p-4 flex flex-col flex-1">
                      <Link to={`/product/${p._id}`}>
                        <h3 className="text-lg font-semibold mb-2 text-gray-100 hover:text-blue-400 transition">
                          {p.name}
                        </h3>
                      </Link>

                      <p className="text-gray-400 mb-4">${p.price}</p>

                      <div className="mt-auto flex items-center justify-center space-x-3">
                        {qty === 0 ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleQtyChange(p, "add")}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg font-medium shadow hover:shadow-lg"
                          >
                            Add to Cart
                          </motion.button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleQtyChange(p, "dec")}
                              className="bg-gray-700 hover:bg-gray-600 text-xl px-3 py-2 rounded-lg"
                            >
                              ➖
                            </button>
                            <span className="text-lg font-medium">{qty}</span>
                            <button
                              onClick={() => handleQtyChange(p, "inc")}
                              disabled={qty >= p.countInStock}
                              className={`text-xl px-3 py-2 rounded-lg ${
                                qty >= p.countInStock
                                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                  : "bg-gray-700 hover:bg-gray-600"
                              }`}
                            >
                              ➕
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center mt-12">No products found 😢</p>
      )}
    </motion.div>
  );
}
