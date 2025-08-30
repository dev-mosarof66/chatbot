import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/user';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Email is required')
            return
        }
        if (!password) {
            toast.error('Password is required')
            return
        }
        setLoading(true)

        try {
            const res = await axiosInstance.post('/login', {
                email,
                password
            })
            console.log('res in login page: ', res.data)
            toast.success(res.data.message)
            dispatch(setUser(res.data.data))
            navigate('/')
        } catch (error) {
            const status = error?.status
            console.log('error in signup page: ', error.response.status)
            console.log('error in signup page: ', error.response.data)


            if (status === 500) {
                return
            }
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
            setEmail('')
            setPassword('')
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-[90%] mx-auto max-w-md bg-white dark:bg-gray-800 p-4 rounded-sm border border-purple-500'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-3 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='mb-1'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-3 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10'
                            placeholder='Enter your password'
                            required
                        />
                        <div
                            className='absolute right-4 top-11 cursor-pointer text-gray-400 hover:text-purple-400'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </div>
                    </div>
                    <button type='submit' className='bg-purple-600 hover:bg-purple-700 cursor-pointer transition py-2 rounded-sm font-semibold'>
                        {
                            loading ? <span className="loading loading-sm loading-spinner text-neutral"></span>
                                : 'Login'
                        }
                    </button>
                </form>
                <div className='py-2'>
                    <p>Don't have any account ? <Link to='/signup' className='hover:text-purple-500 active:text-purple-600 cursor-pointer transition duration-300d delay-75'>Signup</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
