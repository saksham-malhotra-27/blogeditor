"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginAction } from '@/actions/auth/login'; 
import Cookies from 'js-cookie'; 

function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/'); 
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); 

        try {
            const result = await loginAction({ email, password });

            if (result.success) {
                Cookies.set('token', result.token!, { expires: 7 }); 
                router.push('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred while logging in');
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen">
            <h1 className=" text-3xl mb-4"><span className=' text-4xl text-red-500'>Log</span>in</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2 p-2 text-black border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 text-black p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-2">
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default LoginPage;
