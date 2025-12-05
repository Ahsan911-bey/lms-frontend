"use client";

import { use, useEffect, useState } from "react";
import { getStudentProfile, Student } from "@/lib/api";
import { User, Mail, Phone, MapPin, Calendar, Book, Hash, Wifi, Key } from "lucide-react";

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

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    if (!student) {
        return <div className="p-8 text-center text-red-500">Student not found.</div>;
    }

    const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase font-medium">{label}</p>
                <p className="text-gray-900 font-medium break-all">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Photo & Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                            {student.profilePic ? (
                                <img
                                    src={student.profilePic}
                                    alt={student.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                        <p className="text-blue-600 font-medium">{student.regNo}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Active Student
                        </span>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <Wifi className="mr-2 text-blue-600" size={20} />
                            Digital Accounts
                        </h3>
                        <div className="space-y-2">
                            <InfoItem icon={Wifi} label="Wifi Account" value={student.wifiAccount} />
                            <InfoItem icon={Mail} label="Office 365 Email" value={student.office365Email} />
                            <InfoItem icon={Key} label="Office 365 Password" value={student.office365Pass || "********"} />
                        </div>
                    </div>
                </div>

                {/* Right Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <User className="mr-2 text-blue-600" size={20} />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={User} label="Father's Name" value={student.fatherName} />
                            <InfoItem icon={Calendar} label="Date of Birth" value={student.dob} />
                            <InfoItem icon={MapPin} label="Nationality" value={student.nationality} />
                            <InfoItem icon={Phone} label="Contact Number" value={student.contactNumber} />
                            <InfoItem icon={Phone} label="Guardian Number" value={student.guardianNumber} />
                            <InfoItem icon={Mail} label="Personal Email" value={student.emailAddress} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <Book className="mr-2 text-blue-600" size={20} />
                            Academic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Book} label="Program" value={student.program} />
                            <InfoItem icon={Calendar} label="Session" value={student.session} />
                            <InfoItem icon={Hash} label="Semester" value={student.semester} />
                            <InfoItem icon={Hash} label="Class" value={student.className} />
                            <InfoItem icon={Hash} label="Batch" value={student.batch} />
                            <InfoItem icon={MapPin} label="Campus" value={student.campus} />
                            <InfoItem icon={GraduationCap} label="CGPA" value={student.cgpa} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Importing GraduationCap locally to avoid conflict if not exported from lucide-react in older versions, 
// strictly speaking it is available in recent lucide-react. 
// If it fails, I'll fix it. Assuming it's there as used in Sidebar.
import { GraduationCap } from "lucide-react";
