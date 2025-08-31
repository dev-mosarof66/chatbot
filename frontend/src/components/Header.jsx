/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, User, LogOut, Crown, Sun, Moon } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { setUser } from "../store/slices/user";

const Header = ({ setIsOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const handleToggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/logout");
      toast.success(res.data.message);
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const profileItems = [
    { label: "Profile", icon: <User size={16} />, action: () => navigate("/profile") },
    { label: "Logout", icon: <LogOut size={16} />, action: handleLogout, danger: true },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between md:justify-end px-4 py-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="sm:hidden p-1 rounded-full text-gray-700 dark:text-white hover:bg-purple-500/30 cursor-pointer transition duration-300"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={26} />
      </motion.button>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleTheme}
          className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-500 hover:text-white cursor-pointer transition duration-300"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Upgrade Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/pricing")}
          className="hidden sm:flex items-center text-xs gap-2 py-2 px-4 rounded-md bg-purple-400 text-black font-semibold hover:bg-purple-500 cursor-pointer transition duration-300"
        >
          <Crown size={18} /> Upgrade
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center p-2 rounded-full bg-purple-500 text-white font-bold hover:bg-purple-600 cursor-pointer transition duration-300"
          >
            <FaUser size={20} />
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 z-50"
              >
                {profileItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.action}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-left cursor-pointer transition
                      ${item.danger
                        ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-600/30"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                  >
                    {item.icon} {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Header;
