"use client";

import Link from "next/link";
import { getAdminCourses, Course } from "@/lib/api";
import { BookOpen, ArrowLeft, Users, Calendar } from "lucide-react";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ViewCoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminCourses().then(setCourses).catch(console.error).finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href={`/admin/${id}/students`}
                    className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Select Course</h1>
                    <p className="text-gray-500 mt-1">Choose a course to view enrolled students.</p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-gray-50 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {courses.length > 0 ? (
                        courses.map((course, idx) => (
                            <Link
                                key={course.id}
                                href={`/admin/${id}/students/find/${course.courseNo}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all group h-full"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:text-white shadow-inner">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider rounded-lg border border-gray-100">
                                            {course.courseNo}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {course.courseName}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4 text-gray-400" />
                                            <span>{course.studentIds?.length || 0} Students</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span>{course.credits} Credits</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                            No courses available.
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
