import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        setLoading(true)
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Password:', password);
        // Add your signup logic here
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-[90%] mx-auto max-w-md bg-white dark:bg-gray-800 p-4 rounded-sm border border-purple-500'>
                <h2 className='text-2xl font-bold my-3 text-center'>Signup</h2>
                <form onSubmit={handleSignup} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Full Name</label>
                        <input
                            type='text'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className='p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
                            placeholder='Enter your full name'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500'
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
                            className='p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10'
                            placeholder='Enter your password'
                            required
                        />
                        <div
                            className='absolute top-11 right-4  cursor-pointer text-gray-400 hover:text-purple-400'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='mb-1'>Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10'
                            placeholder='Confirm your password'
                            required
                        />
                        <div
                            className='absolute top-11 right-4 cursor-pointer text-gray-400 hover:text-purple-400'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button type='submit' className='bg-purple-600 hover:bg-purple-700 transition p-2 rounded-lg font-semibold cursor-pointer'>    {
                        loading ? <span className="loading loading-sm loading-spinner text-neutral"></span>
                            : 'Signup'
                    }</button>
                </form>
                <div className='py-2'>
                    <p>Already have an account ? <Link to='/login' className='hover:text-purple-500 active:text-purple-600 cursor-pointer transition duration-300d delay-75'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
