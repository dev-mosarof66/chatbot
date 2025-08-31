import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axiosInstance from '../lib/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/user';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Email is required');
            return;
        }
        if (!password) {
            toast.error('Password is required');
            return;
        }
        setLoading(true);

        try {
            const res = await axiosInstance.post('/login', {
                email,
                password,
            });
            toast.success(res.data.message);
            dispatch(setUser(res.data.data));
            navigate('/');
        } catch (error) {
            const status = error?.response?.status;
            if (status !== 500) {
                toast.error(error?.response?.data?.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-[90%] mx-auto max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-purple-500">

                {/* Header with Theme Toggle */}
                <div className="flex items-center justify-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Login</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                            className="absolute right-4 top-11 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-purple-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 cursor-pointer transition py-2 rounded-md font-semibold text-white"
                    >
                        {loading ? (
                            <span className="loading loading-sm loading-spinner text-neutral"></span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="py-3 text-center">
                    <p className="text-gray-700 dark:text-gray-300">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
