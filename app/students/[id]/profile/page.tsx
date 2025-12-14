"use client";

import { use, useEffect, useState } from "react";
import { getStudentProfile, Student } from "@/lib/api";
import { User, Mail, Phone, MapPin, Calendar, Book, Hash, Wifi, Key, GraduationCap, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentProfile(id);
                setStudent(data);
            } catch (error) {
                console.error("Failed to fetch student profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    if (!student) {
        return <div className="p-8 text-center text-red-500">Student not found.</div>;
    }

    const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-white/40">
            <div className="bg-blue-50/80 p-2.5 rounded-xl text-blue-600 shadow-sm">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{label}</p>
                <p className="text-gray-900 font-medium break-all mt-0.5">{value}</p>
            </div>
        </div>
    );

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Profile Settings</h2>
                    <p className="text-gray-500 mt-1">Manage your personal and academic information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Photo & Basic Info */}
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60 text-center relative overflow-hidden group">
                        {/* Background decoration */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

                        <div className="relative">
                            <div className="w-36 h-36 mx-auto bg-white rounded-full p-1 shadow-xl mb-6">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-100 flex items-center justify-center">
                                    {student.profilePic ? (
                                        <img
                                            src={student.profilePic}
                                            alt={student.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={56} className="text-gray-300" />
                                    )}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{student.name}</h3>
                            <p className="text-blue-600 font-medium mt-1">{student.regNo}</p>
                            <div className="mt-4 flex justify-center gap-2">
                                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    Active Student
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mr-3">
                                <Shield size={20} />
                            </div>
                            Digital Access
                        </h3>
                        <div className="space-y-2">
                            <InfoItem icon={Wifi} label="Wifi Account" value={student.wifiAccount} />
                            <InfoItem icon={Mail} label="Office 365 Email" value={student.office365Email} />
                            <InfoItem icon={Key} label="Office 365 Password" value={student.office365Pass || "********"} />
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Detailed Info */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                                <User size={20} />
                            </div>
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <InfoItem icon={User} label="Father's Name" value={student.fatherName} />
                            <InfoItem icon={Calendar} label="Date of Birth" value={student.dob} />
                            <InfoItem icon={MapPin} label="Nationality" value={student.nationality} />
                            <InfoItem icon={Phone} label="Contact Number" value={student.contactNumber} />
                            <InfoItem icon={Phone} label="Guardian Number" value={student.guardianNumber} />
                            <InfoItem icon={Mail} label="Personal Email" value={student.emailAddress} />
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                                <GraduationCap size={20} />
                            </div>
                            Academic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <InfoItem icon={Book} label="Program" value={student.program} />
                            <InfoItem icon={Calendar} label="Session" value={student.session} />
                            <InfoItem icon={Hash} label="Semester" value={student.semester} />
                            <InfoItem icon={Hash} label="Class" value={student.className} />
                            <InfoItem icon={Hash} label="Batch" value={student.batch} />
                            <InfoItem icon={MapPin} label="Campus" value={student.campus} />
                            <InfoItem icon={GraduationCap} label="CGPA" value={student.cgpa} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
