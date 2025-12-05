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

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        }
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return url;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Video className="mr-2 text-blue-600" size={20} />
                    Learning Resources
                </h3>

                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {resources.map((resource, index) => {
                            const embedUrl = getEmbedUrl(resource.fileUrl);
                            const isVideo = resource.fileUrl.includes('youtube') || resource.fileUrl.includes('youtu.be');

                            return (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                                >
                                    {/* Glass Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Iframe Container */}
                                    <div className="relative w-full aspect-video bg-black/50 border-b border-white/5">
                                        {isVideo ? (
                                            <iframe
                                                src={embedUrl}
                                                title={resource.title}
                                                className="absolute inset-0 w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                                <FileText size={48} className="mb-2 opacity-50" />
                                                <p className="text-xs uppercase tracking-widest">Preview Not Available</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow justify-between relative z-10">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                                {resource.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 mb-4 font-mono break-all line-clamp-1">
                                                {resource.fileUrl}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
                                                <span className={`w-2 h-2 rounded-full mr-2 ${isVideo ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                                {isVideo ? 'Video Resource' : 'External Link'}
                                            </span>

                                            <a
                                                href={resource.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10"
                                            >
                                                <span>Open</span>
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all pointer-events-none"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                            <Video className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No learning resources available yet.</p>
                        <p className="text-sm text-slate-600 mt-2">Check back later for course materials.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
