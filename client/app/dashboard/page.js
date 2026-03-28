"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Rocket, Book, Clock, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchMyCourses();
        }
    }, [user]);

    const fetchMyCourses = async () => {
        try {
            const { data } = await courseService.getMyCourses();
            setCourses(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) return null;

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-dark">Welcome, {user?.name}! 👩🚀</h1>
                        <p className="text-dark/60 mt-2">Ready to continue your journey into space?</p>
                    </div>
                    <Link href="/courses" className="orange-button flex items-center space-x-2">
                        <span>Join New Course</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard icon={<Book className="text-primary" />} label="Enrolled Courses" value={courses.length} />
                    <StatCard icon={<Clock className="text-primary" />} label="Learning Hours" value="12h" />
                    <StatCard icon={<Trophy className="text-primary" />} label="Achievements" value="2" />
                </div>

                <h2 className="text-2xl font-bold text-dark mb-6">Your Enrolled Courses</h2>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Rocket className="w-12 h-12 text-primary animate-bounce" />
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <div key={course._id} className="glass-card rocket-shadow">
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-primary text-xs font-bold uppercase mb-4">
                                    {course.category}
                                </span>
                                <h3 className="text-xl font-bold text-dark mb-3">{course.title}</h3>
                                <p className="text-dark/60 text-sm mb-6 line-clamp-2">{course.description}</p>
                                <button className="w-full border border-orange-200 text-primary font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors">
                                    Continue Learning
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-orange-100">
                        <p className="text-dark/50 text-lg mb-6">You haven't enrolled in any courses yet.</p>
                        <Link href="/courses" className="text-primary font-bold hover:underline">
                            Browse available programs →
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm flex items-center space-x-4">
            <div className="bg-orange-50 p-4 rounded-2xl">{icon}</div>
            <div>
                <p className="text-dark/50 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-dark">{value}</p>
            </div>
        </div>
    );
}
