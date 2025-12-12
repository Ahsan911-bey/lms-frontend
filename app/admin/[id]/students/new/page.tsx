"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { createStudent, StudentCreationData } from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const studentSchema = z.object({
    id: z.coerce.number().min(1, "Student ID is required"),
    name: z.string().min(2, "Name is required"),
    regNo: z.string().min(2, "Registration Number is required"),
    emailAddress: z.string().email("Invalid email address"),
    contactNumber: z.string().min(10, "Contact Number is required"),
    guardianNumber: z.string().min(10, "Guardian Number is required"),
    fatherName: z.string().min(2, "Father Name is required"),
    program: z.string().min(2, "Program is required"),
    session: z.string().min(2, "Session is required"),
    semester: z.string().min(1, "Semester is required"),
    campus: z.string().min(2, "Campus is required"),
    className: z.string().min(2, "Class Name is required"),
    nationality: z.string().min(2, "Nationality is required"),
    dob: z.string().min(10, "Date of Birth is required (YYYY-MM-DD)").regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
    profilePic: z.string().url("Valid URL required").or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cgpa: z.coerce.number().min(0, "CGPA must be non-negative").max(4, "CGPA cannot exceed 4.0"),
    wifiAccount: z.string().optional(),
    office365Email: z.string().email("Invalid Office 365 email").optional().or(z.literal("")),
    office365Pass: z.string().optional(),
    batch: z.string().min(1, "Batch is required"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function CreateStudentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema) as any,
        defaultValues: {
            profilePic: "",
            wifiAccount: "",
            office365Email: "",
            office365Pass: "",
        },
    });

    const onSubmit = async (data: StudentFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createStudent(data);
            router.push(`/admin/${id}/students`);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create student.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href={`/admin/${id}/students`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Students
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
                    <p className="text-gray-500 mt-1">Register a new student to the portal.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Student ID (Numeric)" type="number" error={errors.id} {...register("id")} />
                            <Input label="Full Name" error={errors.name} {...register("name")} />
                            <Input label="Father Name" error={errors.fatherName} {...register("fatherName")} />
                            <Input label="Date of Birth" type="date" error={errors.dob} {...register("dob")} />
                            <Input label="Nationality" error={errors.nationality} {...register("nationality")} />
                            <Input label="Profile Picture URL" placeholder="https://..." error={errors.profilePic} {...register("profilePic")} />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Contact Number" error={errors.contactNumber} {...register("contactNumber")} />
                            <Input label="Guardian Number" error={errors.guardianNumber} {...register("guardianNumber")} />
                            <div className="col-span-2">
                                <Input label="Email Address" type="email" error={errors.emailAddress} {...register("emailAddress")} />
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Academic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Registration No" placeholder="CS-001" error={errors.regNo} {...register("regNo")} />
                            <Input label="Program" placeholder="Computer Science" error={errors.program} {...register("program")} />
                            <Input label="Session" placeholder="FA23" error={errors.session} {...register("session")} />
                            <Input label="Semester" placeholder="1" error={errors.semester} {...register("semester")} />
                            <Input label="Class Name" placeholder="CS-1A" error={errors.className} {...register("className")} />
                            <Input label="Campus" placeholder="ISL" error={errors.campus} {...register("campus")} />
                            <Input label="Batch" placeholder="Batch-A" error={errors.batch} {...register("batch")} />
                            <Input label="CGPA" type="number" step="0.01" error={errors.cgpa} {...register("cgpa")} />
                        </div>
                    </div>

                    {/* Credentials & System Access */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Credentials & Access</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Portal Password" type="password" error={errors.password} {...register("password")} />
                            <Input label="Wi-Fi Account" error={errors.wifiAccount} {...register("wifiAccount")} />
                            <Input label="Office 365 Email" type="email" error={errors.office365Email} {...register("office365Email")} />
                            <Input label="Office 365 Password" type="password" error={errors.office365Pass} {...register("office365Pass")} />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Link
                            href={`/admin/${id}/students`}
                            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Input({ label, error, className = "", ...props }: any) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <input
                className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 focus:bg-white transition-all duration-200 ${error ? "border-red-300 focus:ring-red-200 focus:border-red-500" : "border-gray-200 focus:ring-purple-200 focus:border-purple-500 focus:ring-4"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
