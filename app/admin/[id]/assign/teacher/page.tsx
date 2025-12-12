"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { getAdminTeachers, getAdminCourses, assignTeacherToCourse, Teacher, Course } from "@/lib/api";
import { Loader2, ArrowLeft, BookCopy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const assignTeacherSchema = z.object({
    courseId: z.string().min(1, "Select a course"),
    teacherId: z.string().min(1, "Select a teacher"),
});

type AssignTeacherFormValues = z.infer<typeof assignTeacherSchema>;

export default function AssignTeacherPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        Promise.all([getAdminTeachers(), getAdminCourses()])
            .then(([t, c]) => {
                setTeachers(t);
                setCourses(c);
            })
            .catch(console.error);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AssignTeacherFormValues>({
        resolver: zodResolver(assignTeacherSchema),
    });

    const onSubmit = async (data: AssignTeacherFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await assignTeacherToCourse({ courseId: Number(data.courseId), teacherId: Number(data.teacherId) });
            setSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message || "Failed to assign teacher.");
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

            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Assign Teacher</h1>
                        <p className="text-gray-500 mt-1">Assign a faculty member to a course.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                        <BookCopy className="h-6 w-6" />
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
                            Teacher assigned successfully!
                        </motion.div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
                        <div className="relative">
                            <select
                                {...register("courseId")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none text-zinc-700"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Teacher</label>
                        <div className="relative">
                            <select
                                {...register("teacherId")}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-zinc-700 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none"
                            >
                                <option value="">Select a teacher...</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        {errors.teacherId && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.teacherId.message}</p>}
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
                            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            Assign Teacher
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
