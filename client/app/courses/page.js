"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Rocket, Satellite, Globe, CheckCircle, CreditCard } from 'lucide-react';

export default function Courses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchCourses();
        if (user) fetchMyEnrolled();
    }, [user]);

    const fetchCourses = async () => {
        try {
            const { data } = await courseService.getAll();
            setCourses(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyEnrolled = async () => {
        try {
            const { data } = await courseService.getMyCourses();
            setEnrolledIds(data.map(c => c._id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnroll = async (courseId) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setProcessing(courseId);
        try {
            await courseService.enroll(courseId);
            setEnrolledIds([...enrolledIds, courseId]);
            setMessage("Enrolled Successfully! 🚀");
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(null);
        }
    };

    const sections = [
        { id: 'explore', title: '🚀 Explore', price: 500, label: 'Classes 7–9', icon: <Rocket className="w-10 h-10" /> },
        { id: 'aspirant', title: '🛰️ Aspirant', price: 1000, label: 'Classes 10–12', icon: <Satellite className="w-10 h-10" /> },
        { id: 'professional', title: '🌌 Professional', price: 1500, label: 'Undergraduates & Above', icon: <Globe className="w-10 h-10" /> },
    ];

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />

            {message && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">{message}</span>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-dark mb-4">Choose Your Path</h1>
                    <p className="text-dark/60 text-xl">Specialized training modules for every stage of your career</p>
                </div>

                <div className="space-y-24">
                    {sections.map(section => (
                        <div key={section.id}>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="bg-orange-100 p-3 rounded-2xl text-primary">{section.icon}</div>
                                <div>
                                    <h2 className="text-3xl font-bold text-dark">{section.title}</h2>
                                    <p className="text-primary font-bold">{section.label} • ₹{section.price}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.filter(c => c.category === section.id).length > 0 ? (
                                    courses.filter(c => c.category === section.id).map(course => (
                                        <div key={course._id} className="glass-card rocket-shadow flex flex-col">
                                            <h3 className="text-xl font-bold text-dark mb-3">{course.title}</h3>
                                            <p className="text-dark/60 text-sm mb-6 flex-grow">{course.description}</p>

                                            {enrolledIds.includes(course._id) ? (
                                                <button disabled className="w-full bg-green-50 text-green-600 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 border border-green-100">
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span>Enrolled</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEnroll(course._id)}
                                                    disabled={processing === course._id}
                                                    className="w-full orange-button py-3 flex items-center justify-center space-x-2"
                                                >
                                                    <CreditCard className="w-5 h-5" />
                                                    <span>{processing === course._id ? 'Processing...' : `Pay ₹${section.price}`}</span>
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 text-center text-dark/40 font-medium italic">
                                        No courses available in this category yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
