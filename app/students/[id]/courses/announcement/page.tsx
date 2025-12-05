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

            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Bell className="mr-2 text-blue-600" size={20} />
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
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                            >
                                {/* Decorative Gradient Blob */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                <Bell size={18} />
                                            </div>
                                            <h4 className="font-semibold text-white">New Announcement</h4>
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500 font-mono bg-black/20 px-2 py-1 rounded">
                                            <Calendar size={12} className="mr-2" />
                                            {new Date(announcement.timestamp).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed text-sm md:text-base border-l-2 border-blue-500/50 pl-4">
                                        {announcement.message}
                                    </p>

                                    <div className="mt-4 flex justify-end">
                                        <span className="text-[10px] text-slate-600 uppercase tracking-widest">
                                            Posted at {new Date(announcement.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                            <Bell className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No announcements yet.</p>
                        <p className="text-sm text-slate-600 mt-2">Any updates from your instructor will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
