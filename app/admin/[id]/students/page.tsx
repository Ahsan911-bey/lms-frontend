"use client";

import Link from "next/link";
import { Plus, Users, Search, GraduationCap, ArrowRight } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";

export default function StudentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const actions = [
        {
            title: "Create New Student",
            description: "Register a new student into the university system with their personal and academic details.",
            href: `/admin/${id}/students/new`,
            icon: Plus,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:border-purple-200 group-hover:bg-purple-100"
        },
        {
            title: "View by Course",
            description: "Browse students by selecting a specific course and batch.",
            href: `/admin/${id}/students/view`,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200 group-hover:bg-blue-100"
        },
        {
            title: "View All Students",
            description: "List and manage all students registered in the university.",
            href: `/admin/${id}/students/all`,
            icon: Search,
            color: "bg-green-50 text-green-600",
            hover: "hover:border-green-200 group-hover:bg-green-100"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                <p className="text-gray-500 mt-1">Add new students or view and manage existing records.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <p className="text-gray-500 leading-relaxed mb-8">{action.description}</p>

                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                <div className="h-10 w-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
            >
                {/* <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Student Analytics</h3>
                        <p className="text-indigo-200 max-w-lg">Get insights into student performance, attendance trends, and enrollment statistics across all departments.</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                        View Reports
                    </button>
                </div> */}

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
            </motion.div>
        </motion.div>
    );
}
