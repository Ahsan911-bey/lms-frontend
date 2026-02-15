"use client";

import { useEffect, useState } from "react";
import { Student, getAllStudents } from "@/lib/api";
import { Loader2, ArrowLeft, Mail, Phone, Calendar, Flag, User, Book, Wifi, Key, CreditCard } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";

export default function StudentDetailsPage({ params }: { params: Promise<{ id: string; studentId: string }> }) {
    const { id: adminId, studentId } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error || !student) {
        return (
            <div className="p-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto mt-20">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
                <p className="text-gray-500 mb-6">{error || "Student profile could not be found."}</p>
                <Link
                    href={`/admin/${adminId}/students/all`}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all"
                >
                    Return to Student List
                </Link>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 max-w-6xl mx-auto pb-10"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
                <Link
                    href={`/admin/${adminId}/students/all`}
                    className="p-3 hover:bg-white rounded-xl text-gray-500 hover:text-gray-900 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
                    <p className="text-gray-500">Detailed information for <span className="text-indigo-600 font-medium">{student.name}</span></p>
                </div>
            </motion.div>

            {/* Profile Header */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>

                {/* Decorative circles */}
                <div className="absolute top-10 right-20 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute top-20 left-20 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>

                <div className="relative flex flex-col sm:flex-row items-end sm:items-center gap-8 mt-16 w-full px-4">
                    <div className="h-36 w-36 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-white z-10 transform sm:translate-y-4">
                        <img
                            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                            alt={student.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="mb-2 z-10 flex-1 w-full text-center sm:text-left">
                        <h2 className="text-4xl font-bold text-gray-900 mb-1">{student.name}</h2>
                        <p className="text-gray-500 font-medium mb-4 flex items-center justify-center sm:justify-start gap-2">
                            <User className="h-4 w-4" /> Student ID: {student.id}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm">
                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full font-bold border border-indigo-100 flex items-center gap-1.5">
                                <CreditCard className="h-3.5 w-3.5" />
                                {student.regNo}
                            </span>
                            <span className="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full font-bold border border-purple-100 flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {student.batch}
                            </span>
                            <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full font-bold border border-green-100 flex items-center gap-1.5">
                                <Flag className="h-3.5 w-3.5" />
                                CGPA: {student.cgpa}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Personal Information */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                            <p className="text-sm text-gray-400">Basic personal details</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <DetailItem label="Father's Name" value={student.fatherName} />
                            <DetailItem label="Nationality" value={student.nationality} />
                            <DetailItem label="Date of Birth" value={student.dob} />
                            <DetailItem label="Campus" value={student.campus} />
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="h-12 w-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
                            <p className="text-sm text-gray-400">Communication channels</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <DetailItem icon={<Mail className="h-5 w-5" />} label="Email Address" value={student.emailAddress} fullWidth />
                        <DetailItem icon={<Phone className="h-5 w-5" />} label="Contact Number" value={student.contactNumber} fullWidth />
                        <DetailItem icon={<User className="h-5 w-5" />} label="Guardian Number" value={student.guardianNumber} fullWidth />
                    </div>
                </motion.div>

                {/* Academic Information */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                            <Book className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Academic Info</h3>
                            <p className="text-sm text-gray-400">Educational background</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <DetailItem label="Program" value={student.program} />
                        <DetailItem label="Session" value={student.session} />
                        <DetailItem label="Semester" value={student.semester} />
                        <DetailItem label="Section" value={student.className} />
                    </div>
                </motion.div>

                {/* IT / Account Info */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                        <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Wifi className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">IT Accounts</h3>
                            <p className="text-sm text-gray-400">System access credentials</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <AccountItem label="Wi-Fi" value={student.wifiAccount} />
                        {student.password && (
                            <AccountItem label="Portal Access" pass={student.password} />
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function DetailItem({ label, value, icon, fullWidth = false }: { label: string, value?: string | number, icon?: React.ReactNode, fullWidth?: boolean }) {
    return (
        <div className={`fast-transition ${fullWidth ? 'w-full flex items-start gap-4' : ''}`}>
            {icon && <div className="text-gray-400 mt-0.5">{icon}</div>}
            <div>
                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">{label}</label>
                <p className="text-gray-900 font-semibold mt-1 text-base">{value || "N/A"}</p>
            </div>
        </div>
    );
}

function AccountItem({ label, value, pass }: { label: string, value?: string, pass?: string }) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded-lg px-2 -mx-2 transition-colors">
            <div>
                <label className="text-xs text-gray-400 uppercase font-bold">{label}</label>
                {value && <span className="block text-gray-900 font-medium">{value}</span>}
            </div>

            {/* Logic: If 'pass' exists, show the secure badge instead of the raw string */}
            {pass && (
                <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-emerald-700 font-bold text-xs tracking-wide">
                            ACTIVE & SECURE
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
