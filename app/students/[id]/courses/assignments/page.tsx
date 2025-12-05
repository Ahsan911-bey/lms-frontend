"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { getStudentCourses, Course, Assignment, uploadFile, submitAssignment, getFileDownloadUrl } from "@/lib/api";
import { useCourseStore } from "@/lib/store";
import CourseMenu from "@/components/CourseMenu";
import FileUpload from "@/components/FileUpload";

export default function CourseAssignmentsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [submittingId, setSubmittingId] = useState<number | null>(null);

    useEffect(() => {
        if (!selectedCourseId) {
            router.push(`/students/${id}/courses`);
            return;
        }

        const fetchAssignments = async () => {
            try {
                const courses = await getStudentCourses(id);
                const foundCourse = courses.find(c => c.id === selectedCourseId);
                setCourse(foundCourse || null);
                setAssignments(foundCourse?.assignments || []);
            } catch (error) {
                console.error("Failed to fetch assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [id, selectedCourseId, router]);

    const toggleExpand = (assignmentId: number) => {
        setExpandedIds(prev =>
            prev.includes(assignmentId)
                ? prev.filter(id => id !== assignmentId)
                : [...prev, assignmentId]
        );
    };

    const handleFileUpload = async (file: File, assignmentId: number) => {
        try {
            setSubmittingId(assignmentId);

            // 1. Upload the file
            const filename = await uploadFile(file);

            // 2. Submit the assignment
            await submitAssignment({
                studentId: id,
                assignmentId: assignmentId,
                fileUrl: filename
            });

            // 3. Update local state
            setAssignments(prev => prev.map(a =>
                a.id === assignmentId
                    ? { ...a, status: "submitted", studentSubmissionFileUrl: filename }
                    : a
            ));

            alert("Assignment submitted successfully!");

        } catch (error) {
            console.error("Failed to submit assignment:", error);
            alert("Failed to submit assignment. Please try again.");
        } finally {
            setSubmittingId(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading assignments...</div>;
    }

    if (!course) {
        return (
            <div className="space-y-6">
                <CourseMenu studentId={id} courseId={String(selectedCourseId)} />
                <div className="p-8 text-center text-gray-500">Course not found.</div>
            </div>
        );
    }

    const getStatusColor = (status: Assignment["status"]) => {
        switch (status) {
            case "submitted": return "text-green-400 bg-green-500/10 border-green-500/20";
            case "late": return "text-red-400 bg-red-500/10 border-red-500/20";
            default: return "text-orange-400 bg-orange-500/10 border-orange-500/20";
        }
    };

    const getStatusIcon = (status: Assignment["status"]) => {
        switch (status) {
            case "submitted": return <CheckCircle size={14} className="mr-1" />;
            case "late": return <AlertCircle size={14} className="mr-1" />;
            default: return <Clock size={14} className="mr-1" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
                    <p className="text-sm text-gray-500">{course.courseNo} • {course.credits} Credits</p>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FileText className="mr-2 text-blue-600" size={20} />
                    Assignments
                </h3>

                {assignments.length > 0 ? (
                    <div className="space-y-4">
                        {assignments.map((assignment, index) => {
                            const isExpanded = expandedIds.includes(assignment.id);
                            const isSubmitting = submittingId === assignment.id;
                            const statusStyle = getStatusColor(assignment.status);

                            return (
                                <motion.div
                                    key={assignment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg transition-all"
                                >
                                    {/* Glass Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                    <div
                                        onClick={() => toggleExpand(assignment.id)}
                                        className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex items-start justify-between relative z-10"
                                    >
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{assignment.title}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center ${statusStyle}`}>
                                                    {getStatusIcon(assignment.status)}
                                                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 flex items-center">
                                                <Clock size={14} className="mr-1" />
                                                Due: {new Date(assignment.dueDate).toLocaleDateString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-white/10 bg-black/20"
                                            >
                                                <div className="p-6 space-y-6">
                                                    <div>
                                                        <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Instructions</h5>
                                                        <p className="text-sm text-slate-300 leading-relaxed">{assignment.description}</p>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-4 border-t border-b border-white/10">
                                                        <div className="flex-1">
                                                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Assignment Material</h5>
                                                            {assignment.teacherFileUrl ? (
                                                                <a
                                                                    href={getFileDownloadUrl(assignment.teacherFileUrl)}
                                                                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-500/20"
                                                                    download
                                                                >
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download Assignment
                                                                </a>
                                                            ) : (
                                                                <span className="text-sm text-slate-500 italic flex items-center">
                                                                    <AlertCircle className="mr-2 h-4 w-4" />
                                                                    No file attached
                                                                </span>
                                                            )}
                                                        </div>

                                                        {assignment.status !== "pending" && (
                                                            <div className="flex-1">
                                                                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Your Work</h5>
                                                                {assignment.studentSubmissionFileUrl ? (
                                                                    <a
                                                                        href={getFileDownloadUrl(assignment.studentSubmissionFileUrl)}
                                                                        className="inline-flex items-center text-sm text-green-400 hover:text-green-300 font-medium transition-colors bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 hover:bg-green-500/20"
                                                                        download
                                                                    >
                                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                                        View Your Submission
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-sm text-slate-500">File uploaded</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {assignment.status === "pending" && (
                                                        <div>
                                                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Submit Assignment</h5>
                                                            <div className="max-w-md">
                                                                {isSubmitting ? (
                                                                    <div className="flex flex-col items-center justify-center p-8 border-2 border-white/10 border-dashed rounded-lg bg-white/5">
                                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                                                                        <p className="text-sm text-slate-400">Uploading and submitting...</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="dark-upload-wrapper">
                                                                        <FileUpload
                                                                            label="Upload your solution (PDF)"
                                                                            accept=".pdf,.doc,.docx"
                                                                            onFileSelect={(file) => handleFileUpload(file, assignment.id)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                            <FileText className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No assignments assigned yet.</p>
                        <p className="text-sm text-slate-600 mt-2">Enjoy your free time!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
