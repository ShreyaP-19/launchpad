"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { Plus, Trash2, Users, FileText, LayoutList } from 'lucide-react';

export default function AdminPanel() {
    const { user, loading: authLoading } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        }
    }, [user, authLoading, router]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'explore',
        price: 500
    });

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchCourses();
        }
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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await courseService.create(formData);
            fetchCourses();
            setShowForm(false);
            setFormData({ title: '', description: '', category: 'explore', price: 500 });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await courseService.delete(id);
                fetchCourses();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCategoryChange = (cat) => {
        let price = 500;
        if (cat === 'aspirant') price = 1000;
        if (cat === 'professional') price = 1500;
        setFormData({ ...formData, category: cat, price });
    };

    if (authLoading || !user) return null;
    if (user?.role !== 'admin') {
        return <div className="p-20 text-center font-bold text-red-500">Access Denied</div>;
    }

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-dark flex items-center space-x-3">
                        <LayoutList className="w-10 h-10 text-primary" />
                        <span>Admin Control Center</span>
                    </h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="orange-button flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{showForm ? 'Cancel' : 'Add New Course'}</span>
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-dark italic">Deploy New Mission</h2>
                        <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-dark/70 mb-2">Course Title</label>
                                <input
                                    required
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="e.g. Introduction to Rocket Science"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-dark/70 mb-2">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Detailed mission objectives..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-dark/70 mb-2">Category</label>
                                <select
                                    className="w-full bg-orange-50/50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary"
                                    value={formData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                >
                                    <option value="explore">Explore (7-9)</option>
                                    <option value="aspirant">Aspirant (10-12)</option>
                                    <option value="professional">Professional (Undergrad+)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-dark/70 mb-2">Price (Auto-set)</label>
                                <input
                                    disabled
                                    className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-dark/50"
                                    value={`₹${formData.price}`}
                                />
                            </div>
                            <button type="submit" className="col-span-2 orange-button py-4 text-lg">
                                Publish Course
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-orange-50 border-b border-orange-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-dark/70">Course Title</th>
                                <th className="px-6 py-4 font-bold text-dark/70">Category</th>
                                <th className="px-6 py-4 font-bold text-dark/70">Price</th>
                                <th className="px-6 py-4 font-bold text-dark/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id} className="border-b border-orange-50 hover:bg-orange-50/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-dark">{course.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            {course.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-dark">₹{course.price}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
