"use client";

import { use } from "react";
import { BookOpen, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getStudentCourses, getStudentAttendance, Course, AttendanceStats } from "@/lib/api";
import { motion } from "framer-motion";

export default function DashboardPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const [courses, setCourses] = useState<Course[]>([]);
    const [attendance, setAttendance] = useState<AttendanceStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesData, attendanceData] = await Promise.all([
                    getStudentCourses(id),
                    getStudentAttendance(id)
                ]);
                setCourses(coursesData);
                setAttendance(attendanceData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const totalCourses = courses.length;
    let pendingAssignments = 0;
    courses.forEach(course => {
        if (course.assignments) {
            pendingAssignments += course.assignments.filter(a => a.status === 'pending').length;
        }
    });

    const attendanceMap = new Map(attendance.map(a => [a.courseName, a]));

    const statsVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Overview of your academic progress</p>
                </div>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-100">
                    Fall 2025 Semester
                </span>
            </div>

            {/* Stats / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={statsVariants}
                    className="relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl shadow-blue-500/5 group hover:shadow-blue-500/10 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <BookOpen size={120} className="text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-gray-500 font-medium">Enrolled Courses</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{totalCourses}</p>
                        <p className="text-sm text-gray-400 mt-2">Active courses this semester</p>
                    </div>
                </motion.div>

                <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={statsVariants}
                    className="relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl shadow-orange-500/5 group hover:shadow-orange-500/10 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <AlertCircle size={120} className="text-orange-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                                <AlertCircle size={24} />
                            </div>
                            <h3 className="text-gray-500 font-medium">Assignments Due</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{pendingAssignments}</p>
                        <p className="text-sm text-gray-400 mt-2">Tasks requiring your attention</p>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity / Courses List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-sm overflow-hidden"
            >
                <div className="px-8 py-6 border-b border-white/60 flex justify-between items-center bg-white/30">
                    <h3 className="text-lg font-bold text-gray-800">Attendance Overview</h3>
                </div>
                <div className="divide-y divide-gray-100/50">
                    {courses.length > 0 ? (
                        courses.map((course, index) => {
                            const courseAttendance = attendanceMap.get(course.courseName);
                            const percentage = courseAttendance && courseAttendance.totalClasses > 0
                                ? Math.round((courseAttendance.presents / courseAttendance.totalClasses) * 100)
                                : 0;
                            const hasAttendance = !!courseAttendance;

                            return (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                    className="p-6 hover:bg-white/50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold text-sm shadow-sm border border-blue-100">
                                                {course.courseNo.split('-')[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{course.courseName}</h4>
                                                <p className="text-sm text-gray-500 font-medium">{course.courseNo}</p>
                                            </div>
                                        </div>
                                        {hasAttendance ? (
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-lg font-bold ${percentage >= 75 ? 'text-green-600' : 'text-orange-500'}`}>
                                                        {percentage}%
                                                    </span>
                                                    {percentage >= 75 ?
                                                        <CheckCircle size={18} className="text-green-500" /> :
                                                        <AlertCircle size={18} className="text-orange-500" />
                                                    }
                                                </div>
                                                <span className="text-xs text-gray-400 font-medium bg-white/50 px-2 py-1 rounded-lg">
                                                    {courseAttendance.presents}/{courseAttendance.totalClasses} Classes
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                                                <Clock size={14} />
                                                <span className="text-xs font-medium">No Data</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            No courses available to display.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
