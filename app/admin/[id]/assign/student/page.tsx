"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { getAllStudents, getAdminCourses, assignStudentsToCourse, Student, Course } from "@/lib/api";
import { Loader2, ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const assignStudentSchema = z.object({
    courseId: z.string().min(1, "Select a course"),
    studentIds: z.array(z.string()).min(1, "Select at least one student"),
});

type AssignStudentFormValues = z.infer<typeof assignStudentSchema>;

export default function AssignStudentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        Promise.all([getAllStudents(), getAdminCourses()])
            .then(([s, c]) => {
                setStudents(s);
                setCourses(c);
            })
            .catch(console.error);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AssignStudentFormValues>({
        resolver: zodResolver(assignStudentSchema),
    });

    const onSubmit = async (data: AssignStudentFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await assignStudentsToCourse({
                courseId: Number(data.courseId),
                studentIds: data.studentIds.map(Number)
            });
            setSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message || "Failed to assign students.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
        >
            <Link
                href={`/admin/${id}/assign`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
            </Link>

            <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Assign Students</h1>
                        <p className="text-gray-500 mt-1">Enroll students into a course manually.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm border border-gray-100">
                        <UserPlus className="h-6 w-6" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-green-50 text-green-600 rounded-xl text-sm border border-green-100"
                        >
                            Students assigned successfully!
                        </motion.div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
                        <div className="relative">
                            <select
                                {...register("courseId")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all appearance-none"
                            >
                                <option value="">Select a course...</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.courseName} ({c.courseNo})</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        {errors.courseId && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.courseId.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Students</label>
                        <select
                            multiple
                            {...register("studentIds")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all min-h-[150px]"
                        >
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-2">Hold Ctrl/Cmd to select multiple students.</p>
                        {errors.studentIds && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.studentIds.message}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/assign`}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-green-300 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            Assign Students
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
