"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, Users, Bell, FileText, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/api";

interface DashboardStats {
    totalCourses: number;
    totalStudents: number;
    totalAssignments: number;
    totalAnnouncements: number;
}

interface DashboardContentProps {
    stats: DashboardStats;
    courses: Course[];
    semesterName: string;
}

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardContent({ stats, courses, semesterName }: DashboardContentProps) {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, here is your semester overview.</p>
                </div>
                <span className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium shadow-sm border border-blue-100">{semesterName}</span>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Assigned Courses"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="blue"
                />
                <StatsCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="indigo"
                />
                <StatsCard
                    title="Announcements"
                    value={stats.totalAnnouncements}
                    icon={Bell}
                    color="emerald"
                />
                <StatsCard
                    title="Assignments"
                    value={stats.totalAssignments}
                    icon={FileText}
                    color="orange"
                />
            </motion.div>

            {/* Courses Overview */}
            <motion.div variants={itemVars}>
                <h3 className="font-bold text-xl text-gray-800 mt-8 mb-4">Your Courses</h3>
                <motion.div variants={containerVars} className="space-y-4">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function StatsCard({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600",
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        orange: "bg-orange-50 text-orange-500",
    };

    const textClasses: Record<string, string> = {
        blue: "text-gray-900",
        indigo: "text-gray-900",
        emerald: "text-emerald-600",
        orange: "text-orange-500",
    };

    return (
        <motion.div
            variants={itemVars}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow group"
        >
            <div>
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <p className={`text-3xl font-bold mt-2 ${textClasses[color]}`}>{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
            </div>
        </motion.div>
    );
}

function CourseCard({ course }: { course: Course }) {
    return (
        <motion.div
            variants={itemVars}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex hover:-translate-y-1"
        >
            <div className="w-2 bg-gradient-to-b from-blue-500 to-indigo-600 flex-shrink-0"></div>
            <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider border border-blue-100">
                            {course.courseNo}
                        </span>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                            {course.credits} Credits
                        </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors" title={course.courseName}>
                        {course.courseName}
                    </h4>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2" title="Students Enrolled">
                        <Users size={16} className="text-indigo-400" /> {course.studentIds?.length || 0} Students
                    </span>
                    <span className="flex items-center gap-2" title="Assignments">
                        <FileText size={16} className="text-orange-400" /> {course.assignments?.length || 0}
                    </span>
                    <span className="flex items-center gap-2" title="Announcements">
                        <Bell size={16} className="text-emerald-400" /> {course.announcements?.length || 0}
                    </span>
                </div>

                <div className="flex items-center">
                    <Link href={`./course-actions`} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 whitespace-nowrap">
                        View Actions &rarr;
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <motion.div variants={itemVars} className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-4 animate-pulse">
                <BookOpen className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No Courses Found</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't been assigned any courses yet.</p>
        </motion.div>
    );
}
