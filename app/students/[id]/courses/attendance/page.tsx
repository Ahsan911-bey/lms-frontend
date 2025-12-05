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
                    <h2 className="text-2xl font-bold text-gray-800">{attendance.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <CalendarCheck className="mr-2 text-blue-600" size={20} />
                    Attendance Overview
                </h3>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative overflow-hidden rounded-2xl p-8 border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl"
                >
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Total Classes</p>
                                <p className="text-4xl font-bold text-white mt-3">{attendance.totalClasses}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm hover:bg-green-500/20 transition-colors group/stat">
                                <p className="text-xs text-green-400 font-semibold uppercase tracking-widest">Presents</p>
                                <p className="text-4xl font-bold text-green-400 mt-3 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">{attendance.presents}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm hover:bg-red-500/20 transition-colors">
                                <p className="text-xs text-red-400 font-semibold uppercase tracking-widest">Absents</p>
                                <p className="text-4xl font-bold text-red-400 mt-3 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">{attendance.absents}</p>
                            </div>
                        </div>

                        <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="block text-sm font-medium text-slate-400 mb-1">Overall Attendance</span>
                                    <span className={`text-3xl font-bold ${percentage >= 75 ? 'text-green-400' : 'text-orange-400'}`}>
                                        {percentage}%
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">Target: 75%</span>
                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner border border-white/5">
                                <motion.div
                                    className={`h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] relative ${percentage >= 75 ? 'bg-gradient-to-r from-green-600 to-green-400' : 'bg-gradient-to-r from-orange-600 to-orange-400'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                >
                                    <div className="absolute inset-0 bg-white/20"></div>
                                </motion.div>
                            </div>

                            <p className="text-sm text-slate-400 mt-4 text-center italic">
                                {percentage >= 75
                                    ? " You are maintaining good attendance. Keep it up!"
                                    : " Your attendance is below 75%. Please attend upcoming classes."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
