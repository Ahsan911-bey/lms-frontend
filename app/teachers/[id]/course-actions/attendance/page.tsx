"use client";

import Link from "next/link";
import { Eye, Edit, CheckSquare, Calendar, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AttendanceActionsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Unwrapping params safely if needed, or just using props if server component wrapper existed.
    // For now we assume this is top level page converting to client.
    // We can't await params here directly.
    // But we can get id from path via explicit hook if we want to be strict client interactive 
    // OR we can rely on standard Page prop passing where params is a promise we use();
    // However, since we are replacing the file, let's try to keep it safe by making it a Client Component 
    // that uses a hook or receiving unwrapped id from a layout if possible? No.

    // Safe bet: Keep it Server Component, import Client Content. 
    // Actually, for static pages, it's fine. But I'll stick to Server->Client pattern for consistency and params handling.

    return <AttendanceActionsContent params={params} />;
}

import { use } from "react";

function AttendanceActionsContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${id}/course-actions`} className="hover:text-blue-600 hover:underline">Course Actions</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">Attendance</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Attendance</h2>
                    <p className="text-gray-500 text-sm mt-1">Select an action to proceed.</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl py-4">
                <Link href={`/teachers/${id}/course-actions/attendance/check`} className="group h-full block">
                    <motion.div
                        variants={itemVars}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all flex items-start gap-6 h-full relative overflow-hidden group-hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner relative z-10">
                            <Eye size={36} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Check Attendance</h3>
                                <ArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                            </div>
                            <p className="text-gray-500 mt-2 leading-relaxed">View attendance records for students in your courses. Drill down by batch and student.</p>
                        </div>
                    </motion.div>
                </Link>

                <Link href={`/teachers/${id}/course-actions/attendance/mark`} className="group h-full block">
                    <motion.div
                        variants={itemVars}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-xl hover:border-emerald-200 transition-all h-full relative overflow-hidden group-hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner relative z-10">
                            <CheckSquare size={36} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Mark Attendance</h3>
                                <ArrowRight className="text-gray-300 group-hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
                            </div>
                            <p className="text-gray-500 mt-2 leading-relaxed">Take attendance for a specific class session. Select a course and date.</p>
                        </div>
                    </motion.div>
                </Link>
            </motion.div>
        </motion.div>
    );
}
