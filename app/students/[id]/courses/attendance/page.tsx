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
                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Classes</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{attendance.totalClasses}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600 font-medium uppercase tracking-wider">Presents</p>
                            <p className="text-3xl font-bold text-green-700 mt-2">{attendance.presents}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600 font-medium uppercase tracking-wider">Absents</p>
                            <p className="text-3xl font-bold text-red-700 mt-2">{attendance.absents}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
                            <span className={`text-lg font-bold ${percentage >= 75 ? 'text-green-600' : 'text-orange-500'}`}>
                                {percentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <motion.div
                                className={`h-4 rounded-full ${percentage >= 75 ? 'bg-green-500' : 'bg-orange-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            {percentage >= 75
                                ? "You are maintaining good attendance. Keep it up!"
                                : "Your attendance is below 75%. Please attend upcoming classes."}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
