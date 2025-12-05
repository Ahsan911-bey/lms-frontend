"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { getStudentMarks, MarksData } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseMenu from "@/components/CourseMenu";

export default function CourseMarksPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const [marks, setMarks] = useState<MarksData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedCourseId) {
            router.push(`/students/${id}/courses`);
            return;
        }

        const fetchMarks = async () => {
            try {
                const data = await getStudentMarks(id);
                // Filter for the selected course
                const courseMarks = data.find(m => m.courseId === selectedCourseId);
                setMarks(courseMarks || null);
            } catch (error) {
                console.error("Failed to fetch marks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [id, selectedCourseId, router]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading marks...</div>;
    }

    if (!marks) {
        return (
            <div className="space-y-6">
                <CourseMenu studentId={id} courseId={String(selectedCourseId)} />
                <div className="p-8 text-center text-gray-500">No marks records found for this course.</div>
            </div>
        );
    }

    const markItems = [
        { label: "Quiz Marks", value: marks.quizMarks },
        { label: "Assignment Marks", value: marks.assignmentMarks },
        { label: "Mids Marks", value: marks.midsMarks },
        { label: "Final Marks", value: marks.finalMarks },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{marks.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <GraduationCap className="mr-2 text-blue-600" size={20} />
                    Marks Distribution
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                    {markItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Decorative Gradient Blob */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 ${item.label.includes("Quiz") ? "bg-blue-500" :
                                item.label.includes("Assignment") ? "bg-purple-500" :
                                    item.label.includes("Mids") ? "bg-orange-500" :
                                        "bg-green-500"
                                }`}></div>

                            <div className="relative z-10">
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">{item.label}</h4>
                                <div className="flex items-baseline space-x-1">
                                    <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.label.includes("Quiz") ? "from-blue-400 to-blue-200" :
                                        item.label.includes("Assignment") ? "from-purple-400 to-purple-200" :
                                            item.label.includes("Mids") ? "from-orange-400 to-yellow-200" :
                                                "from-green-400 to-emerald-200"
                                        }`}>
                                        {item.value.toFixed(2)}
                                    </p>
                                    <span className="text-sm text-slate-500 font-medium">/ 100</span> {/* Assuming 100 for visual context, or just remove */}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
