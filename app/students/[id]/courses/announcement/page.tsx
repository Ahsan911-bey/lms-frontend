"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Calendar } from "lucide-react";
import { getStudentCourses, Course } from "@/lib/api";
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
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">{course.courseName}</h2>
                    <p className="text-gray-500 mt-1">{course.courseNo} • {course.credits} Credits</p>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                        <Bell size={20} />
                    </div>
                    Announcements
                </h3>

                {course.announcements && course.announcements.length > 0 ? (
                    <div className="space-y-4">
                        {course.announcements.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                            <Bell size={18} />
                                        </div>
                                        <h4 className="font-bold text-gray-800">New Announcement</h4>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                        <Calendar size={12} className="mr-2" />
                                        {new Date(announcement.timestamp).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed text-sm md:text-base border-l-2 border-blue-200 pl-4">
                                    {announcement.message}
                                </p>

                                <div className="mt-4 flex justify-end">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                                        Posted at {new Date(announcement.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                            <Bell className="w-8 h-8" />
                        </div>
                        <p className="text-gray-600 font-medium">No announcements yet.</p>
                        <p className="text-sm text-gray-400 mt-2">Any updates from your instructor will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
