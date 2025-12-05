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
            case "submitted": return "text-green-600 bg-green-50 border-green-200";
            case "late": return "text-red-600 bg-red-50 border-red-200";
            default: return "text-orange-600 bg-orange-50 border-orange-200";
        }
    };

    const getStatusIcon = (status: Assignment["status"]) => {
        switch (status) {
            case "submitted": return <CheckCircle className="w-4 h-4 mr-1" />;
            case "late": return <AlertCircle className="w-4 h-4 mr-1" />;
            default: return <Clock className="w-4 h-4 mr-1" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
                </div>
            </div>

            <CourseMenu studentId={id} courseId={String(selectedCourseId)} />

            <div className="space-y-4">
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
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    <div
                                        onClick={() => toggleExpand(assignment.id)}
                                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-start justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${statusStyle}`}>
                                                    {getStatusIcon(assignment.status)}
                                                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Due: {new Date(assignment.dueDate).toLocaleDateString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-100 bg-gray-50/50"
                                            >
                                                <div className="p-6 space-y-6">
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-900 mb-2">Instructions</h5>
                                                        <p className="text-sm text-gray-600 leading-relaxed">{assignment.description}</p>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-t border-b border-gray-100">
                                                        <div className="flex-1">
                                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Assignment Material</h5>
                                                            {assignment.teacherFileUrl ? (
                                                                <a
                                                                    href={getFileDownloadUrl(assignment.teacherFileUrl)}
                                                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                                    download
                                                                >
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download Teacher's File
                                                                </a>
                                                            ) : (
                                                                <span className="text-sm text-gray-400 italic flex items-center">
                                                                    <AlertCircle className="mr-2 h-4 w-4" />
                                                                    No file attached
                                                                </span>
                                                            )}
                                                        </div>

                                                        {assignment.status !== "pending" && (
                                                            <div className="flex-1">
                                                                <h5 className="text-sm font-medium text-gray-900 mb-2">Your Work</h5>
                                                                {assignment.studentSubmissionFileUrl ? (
                                                                    <a
                                                                        href={getFileDownloadUrl(assignment.studentSubmissionFileUrl)}
                                                                        className="inline-flex items-center text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
                                                                        download
                                                                    >
                                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                                        View Your Submission
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-sm text-gray-500">File uploaded</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {assignment.status === "pending" && (
                                                        <div>
                                                            <h5 className="text-sm font-medium text-gray-900 mb-4">Submit Assignment</h5>
                                                            <div className="max-w-md">
                                                                {isSubmitting ? (
                                                                    <div className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 border-dashed rounded-lg bg-gray-50">
                                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                                                        <p className="text-sm text-gray-500">Uploading and submitting...</p>
                                                                    </div>
                                                                ) : (
                                                                    <FileUpload
                                                                        label="Upload your solution (PDF)"
                                                                        accept=".pdf,.doc,.docx"
                                                                        onFileSelect={(file) => handleFileUpload(file, assignment.id)}
                                                                    />
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
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No assignments assigned yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
