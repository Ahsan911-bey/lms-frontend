"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { getStudentCourses, Course } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseCard from "@/components/CourseCard";
import { BookOpen } from "lucide-react";

export default function CoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const setSelectedCourseId = useCourseStore((state) => state.setSelectedCourseId);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getStudentCourses(id);
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [id]);

    const handleCourseClick = (courseId: number) => {
        setSelectedCourseId(courseId);
        router.push(`/students/${id}/courses/announcement`);
    };

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">My Courses</h2>
                    <p className="text-gray-500 mt-1">Manage and view your enrolled courses</p>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-blue-600">
                    <BookOpen size={24} />
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <motion.div key={course.id} variants={itemVariants} className="h-full">
                            <CourseCard
                                course={course}
                                onClick={handleCourseClick}
                            />
                        </motion.div>
                    ))
                ) : (
                    <motion.div variants={itemVariants} className="col-span-full">
                        <div className="text-center py-16 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60">
                            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">No courses found for this semester.</p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
