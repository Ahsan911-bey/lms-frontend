"use client";

import {
    getAdminProfile,
    getAllStudents,
    getAdminTeachers,
    getAdminCourses,
    getAllBatches
} from "@/lib/api";
import Link from "next/link";
import { Users, School, BookOpen, Layers, PlusCircle, ArrowRight, GraduationCap } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { use, useEffect, useState } from "react";

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

export default function AdminDashboard({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [data, setData] = useState<{
        admin: any;
        students: any[];
        teachers: any[];
        courses: any[];
        batches: any[];
    } | null>(null);

    // Fetch data client-side to allow for animations on mount (or could pass initial data)
    // For simplicity with server components, we can animate the whole page load.
    // However, since we need "use client" for framer-motion, we might as well fetch inside useEffect 
    // OR allow the server to pass data to a client wrapper.
    // To keep it simple and performant, let's keep it defined as a Client Component for now 
    // (since I changed it to "use client" to access motion).

    // BUT wait, server components are better for data fetching. 
    // Better pattern: Split into a Client Component for the UI and keep Server Component for fetching.
    // However, to avoid refactoring the entire file structure right now, I will use useEffect for fetching 
    // OR simple prop passing if I separate it.
    // Actually, I can just make this a client component that accepts promises if I wanted, 
    // but the previous code was a Server Component. 
    // Converting Server Component to Client Component for Framer Motion is standard, 
    // but we lose async await on the component body.

    // I will refactor to use `useEffect` for data fetching since this creates a smooth client-side transition effect anyway.

    useEffect(() => {
        const fetchData = async () => {
            const [admin, students, teachers, courses, batches] = await Promise.all([
                getAdminProfile(id).catch(() => ({ name: "Administrator", designation: "Admin" })),
                getAllStudents().catch(() => []),
                getAdminTeachers().catch(() => []),
                getAdminCourses().catch(() => []),
                getAllBatches().catch(() => [])
            ]);
            setData({ admin, students, teachers, courses, batches });
        };
        fetchData();
    }, [id]);

    if (!data) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { admin, students, teachers, courses, batches } = data;

    const stats = [
        {
            title: "Total Students",
            value: students.length,
            label: "Registered Students",
            icon: GraduationCap,
            color: "bg-blue-50 text-blue-600",
            border: "hover:border-blue-200"
        },
        {
            title: "Total Teachers",
            value: teachers.length,
            label: "Faculty Members",
            icon: School,
            color: "bg-purple-50 text-purple-600",
            border: "hover:border-purple-200"
        },
        {
            title: "Active Courses",
            value: courses.length,
            label: "Courses in Session",
            icon: BookOpen,
            color: "bg-orange-50 text-orange-600",
            border: "hover:border-orange-200"
        },
        {
            title: "Total Batches",
            value: batches.length,
            label: "Student Batches",
            icon: Layers,
            color: "bg-green-50 text-green-600",
            border: "hover:border-green-200"
        }
    ];

    const quickActions = [
        {
            title: "Add Student",
            href: `/admin/${id}/students/new`,
            icon: PlusCircle,
            color: "text-blue-600 bg-blue-50",
            border: "hover:border-blue-200 hover:bg-blue-50/50"
        },
        {
            title: "Add Teacher",
            href: `/admin/${id}/teachers/new`,
            icon: PlusCircle,
            color: "text-purple-600 bg-purple-50",
            border: "hover:border-purple-200 hover:bg-purple-50/50"
        },
        {
            title: "Create Course",
            href: `/admin/${id}/courses/create`,
            icon: PlusCircle,
            color: "text-orange-600 bg-orange-50",
            border: "hover:border-orange-200 hover:bg-orange-50/50"
        },
        {
            title: "Create Batch",
            href: `/admin/${id}/batches/create`,
            icon: PlusCircle,
            color: "text-green-600 bg-green-50",
            border: "hover:border-green-200 hover:bg-green-50/50"
        }
    ];

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section */}
            <motion.div
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl shadow-lg shadow-purple-900/5 border border-white/20 relative overflow-hidden backdrop-blur-xl"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{admin.name.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Here's an overview of your university portal statistics today.
                    </p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                        className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-900/5 border border-gray-100 transition-all duration-300 ${stat.border} group`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium text-sm">{stat.title}</h3>
                            <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                        <p className="text-gray-400 text-xs font-medium mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="h-8 w-1 bg-purple-600 rounded-full"></div>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center justify-between group ${action.border}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center shadow-sm ${action.color}`}>
                                        <action.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                                        {action.title}
                                    </span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
