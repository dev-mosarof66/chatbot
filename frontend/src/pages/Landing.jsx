/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { FaBars, FaTimes } from "react-icons/fa";

const Landing = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    // Define nav items
    const navItems = [
        { label: "Home", path: "/" },
        { label: "Pricing", path: "/pricing" },
        { label: "About", path: "" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col relative">
            {/* Navbar */}
            <header className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white relative z-20">
                <h1 className="text-2xl font-bold tracking-wide">🤖</h1>

                {/* Desktop Nav */}
                <nav className="hidden sm:flex gap-4">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={` font-medium  hover:text-purple-500 text-white cursor-pointer transition-all duration-300 delay-75`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <div className=" flex items-center">
                    <button onClick={() => navigate('/login')} className=" hidden sm:flex items-center justify-center py-2 px-6 rounded-sm border border-purple-800 hover:bg-purple-800 active:scale-[0.95] cursor-pointer transition-all duration-300 delay-75">
                        Get Started
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpen(!isOpen)}
                        className="flex items-center justify-center sm:hidden p-2 rounded-full text-white shadow-lg bg-purple-600/50 hover:bg-purple-600/70 cursor-pointer transition-all duration-300 delay-75"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </motion.button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight">
                    Chat Smarter, <br /> Not Harder 🚀
                </h2>
                <p className="mt-4 text-lg sm:text-xl max-w-2xl text-gray-200">
                    Meet <span className="font-semibold">ChatBotAI</span> — your intelligent assistant for learning, coding,
                    and productivity. Available 24/7 to answer your questions and make life easier.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button onClick={() => '/login'} className=" hidden sm:flex items-center justify-center py-2 px-6 rounded-sm  bg-purple-800 border border-transparent hover:border-purple-800 hover:bg-transparent active:scale-[0.95] cursor-pointer transition-all duration-300 delay-75">
                        Kick Start
                    </button>
                </div>
            </main>

            {/* Mobile Floating Menu */}
            <div className="w-full fixed top-14 right-0 z-50 md:hidden">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="my-3 w-[90%] flex flex-col gap-2 mx-auto bg-gray-800 text-gray-300 rounded-xl shadow-lg py-6 px-4"
                        >
                            <ul className="flex flex-col text-left">
                                {navItems.map((item) => (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => {
                                                navigate(item.path);
                                                setOpen(false);
                                            }}
                                            className={`w-full px-4 py-2 rounded-md cursor-pointer hover:bg-gray-500/20 active:scale-[0.95] text-purple-600 font-semibold transition-all duration-300 delay-75`}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => navigate('/login')} className="flex items-center justify-center sm:hidden py-2 px-6 rounded-sm border border-purple-800 hover:bg-purple-800 active:scale-[0.95] cursor-pointer transition-all duration-300 delay-75">
                                Get Started
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="py-4 text-center text-gray-400 text-sm relative z-10">
                © {new Date().getFullYear()} ChatBotAI — All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
