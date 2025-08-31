/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Crown,
  LogOut,
  Mail,
  Moon,
  Sun,
  Bell,
  Trash2,
} from "lucide-react";
import { ToggleTheme } from "../lib/theme";

const Profile = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    plan: "Free",
    totalRequests: 1000,
    usedRequests: 250,
  };

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const progress = (user.usedRequests / user.totalRequests) * 100;

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

  const handleToggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const theme = newMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    ToggleTheme(theme);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6 gap-6">
      {/* User Info Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-3">
        <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-4xl font-bold">
          {user.fullName.charAt(0)}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {user.fullName}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Mail size={16} /> {user.email}
        </p>
      </div>

      {/* Plan Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Current Plan
          </span>
          <span className="px-3 py-1 text-sm rounded-md bg-purple-100 dark:bg-purple-600/40 text-purple-600 dark:text-purple-300">
            {user.plan}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {user.usedRequests} of {user.totalRequests} requests used
        </p>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
          <div
            className="h-3 rounded-full bg-purple-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Preferences Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Preferences
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />} Dark Mode
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleTheme}
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              darkMode
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
            }`}
          >
            {darkMode ? "On" : "Off"}
          </motion.button>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Bell size={18} /> Notifications
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotifications(!notifications)}
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              notifications
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
            }`}
          >
            {notifications ? "On" : "Off"}
          </motion.button>
        </div>
      </div>

      {/* Actions Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 cursor-pointer transition"
        >
          <Crown size={18} /> Upgrade Plan
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-red-500 text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-red-600/20 cursor-pointer transition"
        >
          <LogOut size={18} /> Logout
        </motion.button>
      </div>

      {/* Danger Zone Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-3 border-t-4 border-red-500">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
          Danger Zone
        </h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-red-500 text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-red-600/20 cursor-pointer transition"
        >
          <Trash2 size={18} /> Delete Account
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
