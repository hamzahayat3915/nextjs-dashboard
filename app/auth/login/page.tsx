'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/app/lib/utils'; // Adjust the path as needed

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if both fields are filled
        if (!email || !password) {
            setErrorMessage('Please fill in both fields.');
            return;
        }

        try {
            // Send login request to API
           

            const response = await apiRequest('post', '/admin/signin', { email, password });
            
            // Assuming your API returns a token
            const { token } = response;

            // Save the token (e.g., in localStorage or cookies)
            localStorage.setItem('authToken', token);

            // Clear any existing error messages and navigate to the dashboard
            setErrorMessage('');
            router.push('/dashboard');
        } catch (error) {
            setErrorMessage('Invalid email or password.'); // Customize this as needed
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
