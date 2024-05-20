import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/request';
import InputField from '../Component/InputField.component';

interface SignupProps {
    onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/register', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token in local storage
            onSignup();
            navigate('/');
        } catch (error) {
            console.error('Signup failed', error);
            // Handle Signup failure (show error message, etc.)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Sign Up
                </button>
                <p className="text-sm mt-4 text-center">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
