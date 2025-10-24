import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaQuora,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-400 border-t border-gray-800">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 shadow-lg" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            🛍️ ShopVerse 
          </h2>
          <p className="text-gray-400 text-sm tracking-wide mt-5">
            A real-time, full-featured MERN E-Commerce Platform
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 text-sm font-medium">
          <Link to="/" className="hover:text-pink-400 transition-all duration-200">
            Home
          </Link>
          <Link to="/product" className="hover:text-pink-400 transition-all duration-200">
            Products
          </Link>
          <Link to="/cart" className="hover:text-pink-400 transition-all duration-200">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-pink-400 transition-all duration-200">
            Orders
          </Link>
          <Link to="/profile" className="hover:text-pink-400 transition-all duration-200">
            Profile
          </Link>
          <Link to="/contact" className="hover:text-pink-400 transition-all duration-200">
            Contact
          </Link>
        </div>

        <div className="flex justify-center flex-wrap gap-12 text-4xl mt-2">
          <a
            href="https://www.linkedin.com/in/sanskriti988/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://x.com/Sanskriti988"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.instagram.com/sansk_ritiiiiiiii/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.youtube.com/@Sanskriti_988"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaYoutube />
          </a>

          <a
            href="https://medium.com/@kumarisanskriti889"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaMedium />
          </a>

          <a
            href="https://www.quora.com/profile/Sanskriti-628"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaQuora />
          </a>

          <a
            href="mailto:Kumarisanskriti889@gmail.com"
            className="hover:text-purple-400 hover:scale-125 transition-all duration-300 drop-shadow-lg"
          >
            <FaEnvelope />
          </a>
        </div>

        <div className="w-24 h-[2px] bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mt-4" />

        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()}{" "}
          <span className="text-pink-400 font-semibold">ShopVerse</span> — Crafted with 💜 by{" "}
          <span className="text-purple-400 font-medium">Sanskriti</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
