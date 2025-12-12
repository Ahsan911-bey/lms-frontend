"use client";

import Link from "next/link";
import { BookPlus, BookOpen, GraduationCap, ArrowRight, Library } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";

export default function CoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const actions = [
        {
            title: "Create New Course",
            description: "Register a new subject in the university curriculum.",
            href: `/admin/${id}/courses/create`,
            icon: BookPlus,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200 group-hover:bg-blue-100"
        },
        {
            title: "View All Courses",
            description: "Browse the full course catalog and statistics.",
            href: `/admin/${id}/courses/all`,
            icon: BookOpen,
            color: "bg-indigo-50 text-indigo-600",
            hover: "hover:border-indigo-200 group-hover:bg-indigo-100"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                <p className="text-gray-500 mt-1">Manage curriculum, faculty allocations, and enrollments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actions.map((action, idx) => (
                    <Link
                        key={action.title}
                        href={action.href}
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`block p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 group h-full ${action.hover} relative overflow-hidden`}
                        >
                            <div className={`h-14 w-14 ${action.color} rounded-2xl flex items-center justify-center mb-6 transition-transform shadow-inner`}>
                                <action.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">{action.description}</p>

                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                <div className="h-10 w-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="h-16 w-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Library className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Course Directory</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">
                    Access the complete list of courses offered across all departments. Detailed specific syllabus and credit information is available in the catalog.
                </p>
                <button className="mt-6 px-6 py-2 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                    Download Catalog
                </button>
            </motion.div> */}
        </motion.div>
    );
}
