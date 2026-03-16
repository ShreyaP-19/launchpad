"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Rocket, LogOut, LayoutDashboard, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/70 backdrop-blur-xl border-b border-orange-50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <Rocket className="w-7 h-7 text-primary transition-transform duration-500 group-hover:rotate-45" />
                            </div>
                            <span className="text-2xl font-bold text-dark tracking-tighter">Launchpad</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                {user.role !== 'admin' && (
                                    <>
                                        <Link href="/dashboard" className="nav-link">
                                            <LayoutDashboard className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link href="/courses" className="nav-link">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Programs</span>
                                        </Link>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="text-primary hover:text-primary-dark font-bold text-sm tracking-widest uppercase">
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center space-x-4 ml-4 pl-6 border-l border-orange-100">
                                    <div className="text-right">
                                        <p className="text-xs text-dark/40 font-bold uppercase tracking-tighter">
                                            {user.role === 'admin' ? 'Admin' : 'Student'}
                                        </p>
                                        <p className="text-sm font-bold text-dark">{user.name}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="p-2.5 bg-orange-50 text-dark/60 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-dark/70 hover:text-primary font-bold transition-colors">Login</Link>
                                <Link href="/register" className="orange-button shadow-orange-glow">Join Program</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-dark hover:text-primary transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-orange-50 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {user ? (
                                <>
                                    {user.role !== 'admin' && (
                                        <>
                                            <Link href="/dashboard" className="block py-3 px-4 rounded-xl hover:bg-orange-50 text-dark font-medium transition-colors">Dashboard</Link>
                                            <Link href="/courses" className="block py-3 px-4 rounded-xl hover:bg-orange-50 text-dark font-medium transition-colors">Programs</Link>
                                        </>
                                    )}
                                    <button onClick={logout} className="w-full text-left py-3 px-4 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="block py-3 px-4 rounded-xl hover:bg-orange-50 text-dark font-medium transition-colors">Login</Link>
                                    <Link href="/register" className="block py-3 px-4 bg-primary text-white text-center rounded-xl font-bold">Join Program</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
