"use client";

import Link from "next/link";
import { ClipboardList, Bell, FileText, CheckSquare } from "lucide-react";
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

export default function CourseActionsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <motion.div
            className="space-y-8"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Course Actions</h2>
                    <p className="text-gray-500 text-lg mt-2">Manage attendance, assessments, and announcements.</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ActionCard
                    href="./course-actions/attendance"
                    title="Attendance"
                    description="Check or mark student attendance for your classes."
                    icon={CheckSquare}
                    color="blue"
                />
                <ActionCard
                    href="./course-actions/announcements"
                    title="Announcements"
                    description="Post updates and alerts for your students."
                    icon={Bell}
                    color="orange"
                />
                <ActionCard
                    href="./course-actions/assignments"
                    title="Assignments"
                    description="Create and grade course assignments."
                    icon={FileText}
                    color="purple"
                />
                <ActionCard
                    href="./course-actions/marks"
                    title="Marks"
                    description="Upload and manage result sheets."
                    icon={ClipboardList}
                    color="emerald"
                />
            </motion.div>
        </motion.div>
    );
}

function ActionCard({ href, title, description, icon: Icon, color }: { href: string, title: string, description: string, icon: any, color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        orange: "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white",
        purple: "bg-purple-50 text-purple-500 group-hover:bg-purple-600 group-hover:text-white",
        emerald: "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
    };

    const titleColors: Record<string, string> = {
        blue: "group-hover:text-blue-700",
        orange: "group-hover:text-orange-700",
        purple: "group-hover:text-purple-700",
        emerald: "group-hover:text-emerald-700",
    };

    return (
        <Link href={href} className="group h-full">
            <motion.div
                variants={itemVars}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full relative overflow-hidden"
            >
                <div className={`h-16 w-16 mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${colorClasses[color]} shadow-sm`}>
                    <Icon size={32} />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors ${titleColors[color]}`}>{title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{description}</p>

                {/* Decorative background blob */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${colorClasses[color].split(" ")[0]}`}></div>
            </motion.div>
        </Link>
    );
}
