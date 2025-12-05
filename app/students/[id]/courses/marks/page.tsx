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
        { label: "Quiz Marks", value: marks.quizMarks, color: "bg-blue-100 text-blue-700" },
        { label: "Assignment Marks", value: marks.assignmentMarks, color: "bg-purple-100 text-purple-700" },
        { label: "Mids Marks", value: marks.midsMarks, color: "bg-orange-100 text-orange-700" },
        { label: "Final Marks", value: marks.finalMarks, color: "bg-green-100 text-green-700" },
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
                            className={`p-6 rounded-xl border border-gray-100 shadow-sm ${item.color.split(' ')[0]}`} // Use bg color
                        >
                            <h4 className="text-sm font-medium opacity-80 uppercase tracking-wider mb-2">{item.label}</h4>
                            <p className={`text-3xl font-bold ${item.color.split(' ')[1]}`}>
                                {item.value.toFixed(2)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
