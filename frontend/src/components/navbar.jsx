/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { AnimatePresence } from "motion/react";
import { motion } from 'motion/react';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("/");

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Pricing", path: "/pricing" },
        { label: "About", path: "/about" },
    ];

    return (
        <div className='w-full fixed top-0 left-0 backdrop-blur-2xl'>
            <header className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white relative z-20">
                <h1 className="text-2xl font-bold tracking-wide">🤖</h1>

                {/* Desktop Nav */}
                <nav className="hidden sm:flex gap-4">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`font-medium cursor-pointer transition-all duration-300 delay-75
                                ${activeTab === item.path 
                                    ? "text-purple-500 border-b-2 border-purple-500" 
                                    : "text-white hover:text-purple-500"}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex items-center">
                    <button 
                        onClick={() => navigate('/login')} 
                        className="hidden sm:flex items-center text-sm justify-center py-2 px-6 rounded-sm border border-purple-800 hover:bg-purple-800 active:scale-[0.95] cursor-pointer transition-all duration-300 delay-75"
                    >
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
                                            className={`w-full px-4 py-2 rounded-md cursor-pointer active:scale-[0.95] font-semibold transition-all duration-300 delay-75
                                                ${activeTab === item.path 
                                                    ? "bg-purple-700 text-white" 
                                                    : "text-purple-600 hover:bg-gray-500/20"}`}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => navigate('/login')} 
                                className="flex items-center justify-center sm:hidden py-2 px-6 rounded-sm border border-purple-800 hover:bg-purple-800 active:scale-[0.95] cursor-pointer transition-all duration-300 delay-75"
                            >
                                Get Started
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Navbar
