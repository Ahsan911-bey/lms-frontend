"use client";

import { BookOpen, Users, FileText, Video, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/api";
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
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};

interface TeacherCoursesContentProps {
    id: string;
    courses: Course[];
}

export default function TeacherCoursesContent({ id, courses }: TeacherCoursesContentProps) {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={itemVars} className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">My Courses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your courses, assignments and resources.</p>
                </div>
            </motion.div>

            <motion.div variants={containerVars} className="grid grid-cols-1 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <motion.div
                            key={course.id}
                            variants={itemVars}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-100">
                                                {course.courseNo}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">
                                                {course.credits} Credits
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            {course.courseName}
                                        </h3>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group/stat">
                                                <div className="p-2.5 bg-white text-indigo-600 rounded-lg shadow-sm group-hover/stat:scale-110 transition-transform">
                                                    <Users size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.studentIds?.length || 0}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Students</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-purple-50 hover:border-purple-100 transition-colors group/stat">
                                                <div className="p-2.5 bg-white text-purple-600 rounded-lg shadow-sm group-hover/stat:scale-110 transition-transform">
                                                    <Bell size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.announcements?.length || 0}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Alerts</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-amber-50 hover:border-amber-100 transition-colors group/stat">
                                                <div className="p-2.5 bg-white text-amber-600 rounded-lg shadow-sm group-hover/stat:scale-110 transition-transform">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.assignments?.length || 0}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Assignments</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 transition-colors group/stat">
                                                <div className="p-2.5 bg-white text-emerald-600 rounded-lg shadow-sm group-hover/stat:scale-110 transition-transform">
                                                    <Video size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{course.learningResources?.length || 0}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Resources</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 min-w-[160px]">
                                        <Link
                                            href={`/teachers/${id}/students/${course.courseNo}`}
                                            className="w-full px-5 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all text-center shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
                                        >
                                            View Students
                                        </Link>
                                        {/* <button className="w-full px-5 py-3 bg-white text-gray-700 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors hover:border-gray-300">
                                            Manage Course
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                            {/* Latest Announcement Teaser */}
                            {course.announcements && course.announcements.length > 0 && (
                                <div className="bg-orange-50/80 px-6 py-4 border-t border-orange-100 flex items-start gap-3 backdrop-blur-sm">
                                    <div className="p-1 bg-orange-100 rounded text-orange-600 shrink-0">
                                        <Bell size={14} />
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-bold text-gray-900 mr-1">Latest Announcement:</span>
                                        {course.announcements[0].message}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <motion.div variants={itemVars} className="text-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-6 group">
                            <BookOpen className="h-8 w-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No Courses Assigned</h3>
                        <p className="mt-2 text-gray-500">You haven't been assigned any teaching courses yet.</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
