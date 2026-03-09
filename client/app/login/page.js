"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Rocket, Mail, Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await authService.login(email, password);
            login(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
                    <div className="text-center mb-10">
                        <div className="bg-orange-50 inline-flex p-4 rounded-2xl mb-4">
                            <Rocket className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-dark">Welcome Back</h2>
                        <p className="text-dark/60 mt-2">Sign in to your space portal</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center border border-red-100 italic">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-dark/70 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark/70 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full orange-button py-4 text-lg"
                        >
                            {loading ? 'Entering...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-dark/60">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Join program
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
