"use client";

import Link from "next/link";
import { UserPlus, BookCopy, Users, ArrowRight } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";

export default function AssignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const actions = [
        {
            title: "Assign Batch to Course",
            description: "Enroll a batch of students into a course offering.",
            href: `/admin/${id}/assign/batch`,
            icon: Users,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:border-purple-200 group-hover:bg-purple-100"
        },
        {
            title: "Assign Teacher to Course",
            description: "Assign a faculty member to teach a course.",
            href: `/admin/${id}/assign/teacher`,
            icon: BookCopy,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200 group-hover:bg-blue-100"
        },
        {
            title: "Assign Students to Course",
            description: "Manually enroll individual students.",
            href: `/admin/${id}/assign/student`,
            icon: UserPlus,
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
                <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                <p className="text-gray-500 mt-1">Manage course enrollments and teacher assignments.</p>
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
        </motion.div>
    );
}
