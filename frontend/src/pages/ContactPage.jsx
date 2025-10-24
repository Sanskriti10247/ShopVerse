// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaEnvelope, FaHandshake } from "react-icons/fa";
import GoogleMeetLogo from "../assets/Google_Meet-Logo.wine.svg";
import FaceTimeLogo from "../assets/Facetime.jpeg";

function ContactPage() {
  return (
    <section
      id="contact"
      className="bg-gray-950 text-white px-8 pt-12 pb-20 relative overflow-hidden min-h-screen"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500" />

      <div className="flex items-center justify-center gap-4 mb-12 mt-10">
        <FaHandshake className="text-pink-400 text-5xl" />
        <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Get in Touch with ShopVerse
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-gray-900/80 border border-pink-500/30 rounded-2xl p-10 shadow-lg space-y-14 backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-center">
          <a
            href="facetime://your-number-or-appleid"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img
              src={FaceTimeLogo}
              alt="FaceTime Logo"
              className="w-24 h-24 mb-4 bg-white rounded-full p-3 shadow-md hover:shadow-pink-500/30"
            />
          </a>
          <strong className="text-xl font-semibold text-gray-100">
            Schedule a FaceTime Call
          </strong>
          <p className="text-gray-400 text-sm mt-1">
            Connect instantly and talk about collaborations.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <a
            href="https://calendar.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
          >
            <img
              src={GoogleMeetLogo}
              alt="Google Meet Logo"
              className="w-24 h-24 mb-4 bg-white rounded-full p-2 shadow-md hover:shadow-purple-500/30"
            />
          </a>
          <strong className="text-xl font-semibold text-gray-100">
            Schedule a Google Meet
          </strong>
          <p className="text-gray-400 text-sm mt-1">
            Set up a meeting to discuss product demos or support.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <FaEnvelope className="text-purple-400 text-6xl mb-4" />
          <strong className="text-2xl font-semibold text-gray-100 mb-2">
            Write to Us
          </strong>
          <p className="text-gray-400 text-sm mb-4">
            We’d love to hear from you! Drop a mail below 👇
          </p>
          <div className="space-y-2">
            <a
              href="mailto:Kumarisanskriti889@gmail.com"
              className="block text-gray-300 hover:text-pink-400 hover:underline"
            >
              Kumarisanskriti889@gmail.com
            </a>
            <a
              href="mailto:Sanskriti.24bcs10247@sst.scaler.com"
              className="block text-gray-300 hover:text-pink-400 hover:underline"
            >
              Sanskriti.24bcs10247@sst.scaler.com
            </a>
          </div>
        </div>
      </motion.div>

      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[200px] bg-pink-500/20 blur-[120px] rounded-full" />
    </section>
  );
}

export default ContactPage;
