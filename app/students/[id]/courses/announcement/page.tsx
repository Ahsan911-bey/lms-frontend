"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Calendar } from "lucide-react";
import { getStudentCourses, Course, Announcement } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseMenu from "@/components/CourseMenu";

export default function CourseAnnouncementsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedCourseId) {
            router.push(`/students/${id}/courses`);
            return;
        }

        const fetchCourseDetails = async () => {
            try {
                // In a real app, we might have a specific endpoint for course details
                // For now, we fetch all and filter as per instructions
                const courses = await getStudentCourses(id);
                const foundCourse = courses.find(c => c.id === selectedCourseId);
                setCourse(foundCourse || null);
            } catch (error) {
                console.error("Failed to fetch course details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id, selectedCourseId, router]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading announcements...</div>;
    }

    if (!course) {
        return <div className="p-8 text-center text-red-500">Course not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
                    <p className="text-sm text-gray-500">{course.courseNo} • {course.credits} Credits</p>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Bell className="mr-2 text-blue-600" size={20} />
                    Announcements
                </h3>

                {course.announcements && course.announcements.length > 0 ? (
                    <div className="space-y-4">
                        {course.announcements.map((announcement) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <p className="text-gray-800 mb-3">{announcement.message}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                    <Calendar size={14} className="mr-1" />
                                    {new Date(announcement.timestamp).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No announcements yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
