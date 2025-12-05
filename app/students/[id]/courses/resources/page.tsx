"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Video, FileText, Download } from "lucide-react";
import { getStudentCourses, Course, LearningResource } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseMenu from "@/components/CourseMenu";

export default function CourseResourcesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const [resources, setResources] = useState<LearningResource[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedCourseId) {
            router.push(`/students/${id}/courses`);
            return;
        }

        const fetchResources = async () => {
            try {
                const courses = await getStudentCourses(id);
                const foundCourse = courses.find(c => c.id === selectedCourseId);
                setCourse(foundCourse || null);
                setResources(foundCourse?.learningResources || []);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [id, selectedCourseId, router]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading resources...</div>;
    }

    if (!course) {
        return (
            <div className="space-y-6">
                <CourseMenu studentId={id} courseId={String(selectedCourseId)} />
                <div className="p-8 text-center text-gray-500">Course not found.</div>
            </div>
        );
    }

    const getIcon = (url: string) => {
        if (url.includes('youtube') || url.includes('vimeo')) return <Video className="w-5 h-5" />;
        return <FileText className="w-5 h-5" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Download className="mr-2 text-blue-600" size={20} />
                    Learning Resources
                </h3>

                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {resources.map((resource, index) => (
                            <motion.a
                                key={resource.id}
                                href={resource.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="block group"
                            >
                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                                            {getIcon(resource.fileUrl)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {resource.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 truncate max-w-sm md:max-w-xl">
                                                {resource.fileUrl}
                                            </p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No learning resources available yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
