import  { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return toast.error('Fullname is required.');
    if (!email) return toast.error('Email is required.');
    if (password !== confirmPassword) return toast.error('Passwords must match!');

    setLoading(true);
    try {
      const res = await axiosInstance.post('/', { fullName, email, password });
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-[90%] max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-purple-500">
        
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Signup</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              placeholder="Enter your password"
              required
            />
            <div
              className="absolute top-11 right-4 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-purple-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              placeholder="Confirm your password"
              required
            />
            <div
              className="absolute top-11 right-4 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-purple-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 cursor-pointer transition py-2 rounded-md font-semibold text-white"
          >
            {loading ? <span className="loading loading-sm loading-spinner text-neutral"></span> : 'Signup'}
          </button>
        </form>

        {/* Footer */}
        <div className="py-3 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
