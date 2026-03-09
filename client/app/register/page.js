"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Rocket, Mail, Lock, User } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await authService.register(formData);
            login(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <div className="flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
                    <div className="text-center mb-10">
                        <div className="bg-orange-50 inline-flex p-4 rounded-2xl mb-4">
                            <Rocket className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-dark">Create Account</h2>
                        <p className="text-dark/60 mt-2">Start your space career today</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center border border-red-100 italic">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-dark/70 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark/70 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark/70 mb-2">Are you a Student or Admin?</label>
                            <select
                                className="w-full bg-orange-50/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin (Staff Only)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full orange-button py-4 text-lg"
                        >
                            {loading ? 'Creating Account...' : 'Register Now'}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-dark/60">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
