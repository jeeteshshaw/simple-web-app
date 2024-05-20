import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Component/InputField.component';
import axiosInstance from '../Config/request';

interface LoginProps {
    onLogin: () => void;
}
const Login: React.FC<LoginProps> = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            props.onLogin()
            navigate('/');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
                    Login
                </button>
                <p className="text-sm mt-4 text-center">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-blue-500 cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
