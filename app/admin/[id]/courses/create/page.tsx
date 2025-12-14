"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { createCourse } from "@/lib/api";
import { Loader2, ArrowLeft, BookPlus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const courseSchema = z.object({
    courseNo: z.string().min(2, "Course Code is required"),
    courseName: z.string().min(3, "Course Name is required"),
    credits: z.coerce.number().min(1, "Credits must be at least 1").max(6, "Credits cannot exceed 6"),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema) as any,
    });

    const onSubmit = async (data: CourseFormValues) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await createCourse(data);
            setSuccess(true);
            reset();
            // Optional: Redirect or just show success
            setTimeout(() => {
                router.push(`/admin/${id}/courses`);
            }, 1500);
        } catch (err: any) {
            setError(err.message || "Failed to create course.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
        >
            <Link
                href={`/admin/${id}/courses`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Courses
            </Link>

            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/5 border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                        <p className="text-gray-500 mt-1">Add a new course to the university catalog.</p>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
                        <BookPlus className="h-6 w-6" />
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
                            Course created successfully! Redirecting...
                        </motion.div>
                    )}

                    <Input className="text-zinc-900" label="Course Code" placeholder="CS-101" error={errors.courseNo} {...register("courseNo")} />
                    <Input className="text-zinc-900" label="Course Name" placeholder="Introduction to Computing" error={errors.courseName} {...register("courseName")} />
                    <Input className="text-zinc-900" label="Credit Hours" type="number" placeholder="3" error={errors.credits} {...register("credits")} />

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/courses`}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            Create Course
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

function Input({ label, error, className = "", ...props }: any) {
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <input
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 outline-none ${error ? "border-red-200 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center"><span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>{error.message}</p>}
        </div>
    );
}
