/* eslint-disable no-unused-vars */
import Navbar from "../components/navbar";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-900 dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold leading-tight text-white"
        >
          Chat Smarter, <br /> Not Harder 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl max-w-2xl text-gray-200"
        >
          Meet <span className="font-semibold">ChatBotAI</span> — your intelligent assistant for learning, coding,
          and productivity. Available 24/7 to answer your questions and make life easier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center py-2 px-6 rounded-md bg-purple-800 border border-transparent hover:border-purple-800 hover:bg-transparent active:scale-95 cursor-pointer transition-all duration-300 delay-75 text-white font-semibold"
          >
            Kick Start
          </button>
        </motion.div>

        {/* Optional Features / Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { title: "Learn Faster", desc: "Get instant answers to your questions." },
            { title: "Code Smarter", desc: "Generate code snippets and debug faster." },
            { title: "Boost Productivity", desc: "Automate tasks and stay organized." }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 dark:bg-gray-700 rounded-lg p-6 shadow-lg text-white cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-300">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ChatBotAI — All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
