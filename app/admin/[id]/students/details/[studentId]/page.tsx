"use client";

import { useEffect, useState } from "react";
import { Student, getAllStudents } from "@/lib/api";
import { Loader2, ArrowLeft, Mail, Phone, Calendar, Flag, User, Book, Wifi, Key } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function StudentDetailsPage({ params }: { params: Promise<{ id: string; studentId: string }> }) {
    const { id: adminId, studentId } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Strategy Update: Fetch ALL students and filter by ID on the client side specific to user request
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const allStudents = await getAllStudents();
                const foundStudent = allStudents.find(s => String(s.id) === String(studentId));

                if (foundStudent) {
                    setStudent(foundStudent);
                } else {
                    setError("Student not found.");
                }
            } catch (err) {
                console.error("Failed to fetch student details:", err);
                setError("Failed to load student details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (error || !student) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{error || "Student not found"}</p>
                <Link
                    href={`/admin/${adminId}/students/all`}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                >
                    &larr; Back to Student List
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center gap-4 mb-2">
                <Link
                    href={`/admin/${adminId}/students/all`}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
                    <p className="text-gray-500">Detailed information for <span className="text-purple-600 font-medium">{student.name}</span></p>
                </div>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <div className="relative flex flex-col sm:flex-row items-end sm:items-center gap-6 mt-12 w-full">
                    <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-10">
                        <img
                            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                            alt={student.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="mb-2 z-10 flex-1">
                        <h2 className="text-3xl font-bold text-gray-900">{student.name}</h2>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm">
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">
                                {student.regNo}
                            </span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
                                batch: {student.batch}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-200">
                                CGPA: {student.cgpa}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <User className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Father's Name</label>
                                <p className="text-gray-900 font-medium">{student.fatherName}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Nationality</label>
                                <p className="text-gray-900 font-medium">{student.nationality}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Date of Birth</label>
                                <p className="text-gray-900 font-medium">{student.dob}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Campus</label>
                                <p className="text-gray-900 font-medium">{student.campus}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Phone className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Email Address</label>
                                <p className="text-gray-900 font-medium">{student.emailAddress}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Contact Number</label>
                                <p className="text-gray-900 font-medium">{student.contactNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold">Guardian Number</label>
                                <p className="text-gray-900 font-medium">{student.guardianNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Book className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Academic Info</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-semibold">Program</label>
                            <p className="text-gray-900 font-medium">{student.program}</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-semibold">Session</label>
                            <p className="text-gray-900 font-medium">{student.session}</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-semibold">Semester</label>
                            <p className="text-gray-900 font-medium">{student.semester}</p>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-semibold">Section</label>
                            <p className="text-gray-900 font-medium">{student.className}</p>
                        </div>
                    </div>
                </div>

                {/* IT / Account Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Wifi className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">IT Accounts</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold block">Office 365 Email</label>
                                <span className="text-gray-900 font-medium">{student.office365Email}</span>
                            </div>
                            <div className="text-right">
                                <label className="text-xs text-gray-400 uppercase font-semibold block">Password</label>
                                <span className="text-gray-900 font-medium font-mono text-sm">{student.office365Pass}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-semibold block">Wi-Fi Account</label>
                                <span className="text-gray-900 font-medium">{student.wifiAccount}</span>
                            </div>
                        </div>
                        {student.password && (
                            <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-semibold block">Portal Password</label>
                                    <span className="text-gray-900 font-medium font-mono text-sm">{student.password}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
