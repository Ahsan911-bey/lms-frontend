"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCourse, CourseCreationData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const courseSchema = z.object({
    courseNo: z.string().min(1, "Course code is required"),
    courseName: z.string().min(1, "Course name is required"),
    credits: z.coerce.number().min(1, "Credits must be at least 1").max(6, "Credits usually max 6"),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCoursePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema)
    });

    const onSubmit = async (data: CourseFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createCourse(data as CourseCreationData);
            router.push("/admin/courses");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create course");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/courses" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create New Course</h2>
                    <p className="text-gray-500 text-sm mt-1">Add a new subject.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Course Code</label>
                        <input {...register("courseNo")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. CS-101" />
                        {errors.courseNo && <p className="text-xs text-red-500">{errors.courseNo.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Course Name</label>
                        <input {...register("courseName")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. Introduction to Programming" />
                        {errors.courseName && <p className="text-xs text-red-500">{errors.courseName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Credit Hours</label>
                        <input type="number" {...register("credits")} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="3" />
                        {errors.credits && <p className="text-xs text-red-500">{errors.credits.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Creating..." : "Create Course"}
                    </button>
                </div>
            </form>
        </div>
    );
}
