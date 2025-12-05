"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getStudentCourses, Course } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseCard from "@/components/CourseCard";
import { use } from "react";

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

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading courses...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                <span className="text-sm text-gray-500">Fall 2025 Semester</span>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onClick={handleCourseClick}
                    />
                ))}
            </motion.div>

            {courses.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500">No courses found for this semester.</p>
                </div>
            )}
        </div>
    );
}
