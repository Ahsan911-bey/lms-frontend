"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { getStudentAttendance, AttendanceStats } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseMenu from "@/components/CourseMenu";

export default function CourseAttendancePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const [attendance, setAttendance] = useState<AttendanceStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedCourseId) {
            router.push(`/students/${id}/courses`);
            return;
        }

        const fetchAttendance = async () => {
            try {
                const data = await getStudentAttendance(id);
                // Filter for the selected course
                const courseAttendance = data.find(a => a.courseId === selectedCourseId);
                setAttendance(courseAttendance || null);
            } catch (error) {
                console.error("Failed to fetch attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [id, selectedCourseId, router]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading attendance...</div>;
    }

    if (!attendance) {
        return (
            <div className="space-y-6">
                <CourseMenu studentId={id} courseId={String(selectedCourseId)} />
                <div className="p-8 text-center text-gray-500">No attendance records found for this course.</div>
            </div>
        );
    }

    const percentage = attendance.totalClasses > 0
        ? Math.round((attendance.presents / attendance.totalClasses) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">{attendance.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                        <CalendarCheck size={20} />
                    </div>
                    Attendance Overview
                </h3>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative overflow-hidden rounded-3xl p-8 border border-white/60 bg-white/60 backdrop-blur-xl shadow-xl"
                >
                    <div className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
                            <div className="p-6 rounded-2xl bg-white/50 border border-white/60 backdrop-blur-sm shadow-sm">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Classes</p>
                                <p className="text-4xl font-bold text-gray-800 mt-3">{attendance.totalClasses}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-green-50 border border-green-100 backdrop-blur-sm shadow-sm">
                                <p className="text-xs text-green-600 font-bold uppercase tracking-widest">Presents</p>
                                <p className="text-4xl font-bold text-green-600 mt-3">{attendance.presents}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-red-50 border border-red-100 backdrop-blur-sm shadow-sm">
                                <p className="text-xs text-red-600 font-bold uppercase tracking-widest">Absents</p>
                                <p className="text-4xl font-bold text-red-600 mt-3">{attendance.absents}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="block text-sm font-bold text-gray-500 mb-1">Overall Attendance</span>
                                    <span className={`text-3xl font-bold ${percentage >= 75 ? 'text-green-600' : 'text-orange-500'}`}>
                                        {percentage}%
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 font-medium">Target: 75%</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                                <motion.div
                                    className={`h-full rounded-full relative ${percentage >= 75 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-orange-500 to-orange-400'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                >
                                </motion.div>
                            </div>

                            <p className="text-sm text-gray-500 mt-4 text-center italic font-medium">
                                {percentage >= 75
                                    ? "Excellent! You're meeting the attendance requirements."
                                    : "Warning: Your attendance is below the required 75%."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
