"use client";

import Link from "next/link";
import { Plus, Users, UserPlus } from "lucide-react";
import { getAdminTeachers, Teacher, deleteTeacher } from "@/lib/api";
import { useEffect, useState, use } from "react";
import TeacherCard from "./TeacherCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TeachersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {
        try {
            setLoading(true);
            const data = await getAdminTeachers();
            setTeachers(data);
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (teacherId: number) => {
        try {
            await deleteTeacher(teacherId); // You'll need to ensure deleteTeacher is available in api.ts or implement it
            setTeachers(prev => prev.filter(t => t.id !== teacherId));
        } catch (error) {
            console.error("Failed to delete teacher", error);
            alert("Failed to delete teacher");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
                    <p className="text-gray-500 mt-1">Manage faculty members and their assignments</p>
                </div>
                <Link
                    href={`/admin/${id}/teachers/new`}
                    className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Teacher
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-64 bg-gray-50 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {teachers.length > 0 ? (
                            teachers.map((teacher, index) => (
                                <TeacherCard
                                    key={teacher.id}
                                    teacher={teacher}
                                    adminId={id}
                                    onDelete={() => handleDelete(teacher.id)}
                                    index={index}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200"
                            >
                                <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No teachers found</h3>
                                <p className="text-gray-500 mt-1">Get started by adding a new faculty member.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}
