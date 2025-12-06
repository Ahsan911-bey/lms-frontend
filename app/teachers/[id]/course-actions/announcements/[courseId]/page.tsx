"use client";

import { useState, useEffect } from "react";
import { getTeacherCourses, createAnnouncement, deleteAnnouncement, Announcement, Course } from "@/lib/api";
import { Bell, Trash2, Plus, Calendar, AlertCircle, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManageAnnouncementsPage({
    params,
}: {
    params: Promise<{ id: string; courseId: string }>;
}) {
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: string; courseId: string } | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Resolve params
    useEffect(() => {
        params.then(setUnwrappedParams);
    }, [params]);

    // Fetch Data
    useEffect(() => {
        if (!unwrappedParams) return;
        fetchCourseData();
    }, [unwrappedParams]);

    const fetchCourseData = async () => {
        if (!unwrappedParams) return;
        setLoading(true);
        try {
            // We fetch all courses and filter, as there isn't a direct single-course endpoint for teachers exposed in the requirement
            // Alternatively, if backend supports /teacher/{id}/course/{courseId}, we could use that.
            // Based on prompt "Locate the selected course using the saved courseId" from the list.
            const courses = await getTeacherCourses(unwrappedParams.id);
            if (Array.isArray(courses)) {
                const found = courses.find((c: any) => c.id == unwrappedParams.courseId);
                if (found) {
                    setCourse(found);
                } else {
                    setError("Course not found.");
                }
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load course details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (announcementId: number) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return;

        // Optimistic update
        const previousCourse = course;
        if (course && course.announcements) {
            setCourse({
                ...course,
                announcements: course.announcements.filter(a => a.id !== announcementId)
            });
        }

        try {
            await deleteAnnouncement(announcementId);
            // Optionally re-fetch to ensure sync
            // await fetchCourseData(); 
        } catch (err) {
            console.error("Failed to delete", err);
            alert("Failed to delete announcement.");
            // Revert
            setCourse(previousCourse);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !unwrappedParams) return;

        setSubmitting(true);
        try {
            await createAnnouncement({
                courseId: unwrappedParams.courseId,
                message: newMessage
            });
            setNewMessage("");
            setIsCreating(false);
            await fetchCourseData(); // Re-fetch to see the new item with ID and timestamp from server
        } catch (err) {
            console.error(err);
            alert("Failed to post announcement.");
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
            });
        } catch (e) {
            return dateString;
        }
    };

    if (!unwrappedParams) return null;

    if (loading && !course) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                <span className="ml-3 text-gray-500">Loading announcements...</span>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Error</h3>
                <p className="text-gray-500">{error || "Course data unavailable"}</p>
                <Link href="./" className="mt-4 inline-block text-blue-600 hover:underline">Go Back</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Link href={`/teachers/${unwrappedParams.id}/course-actions/announcements`} className="hover:text-blue-600 hover:underline">Announcements</Link>
                        <span>/</span>
                        <span className="font-semibold text-gray-700">{course.courseNo}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Announcements</h2>
                    <p className="text-gray-500 text-sm mt-1">{course.courseName}</p>
                </div>

                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
                >
                    <Plus size={18} /> New Announcement
                </button>
            </div>

            {/* Create Form Modal/Inline */}
            {isCreating && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 relative animation-fade-in">
                    <button
                        onClick={() => setIsCreating(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Announcement</h3>
                    <form onSubmit={handleCreate}>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your announcement message here..."
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] bg-white"
                            required
                        />
                        <div className="flex justify-end mt-4 gap-3">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center gap-2"
                            >
                                {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                Post Announcement
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
                {course.announcements && course.announcements.length > 0 ? (
                    course.announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-100 transition-colors group">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-400 font-medium">
                                        <Calendar size={12} className="text-orange-400" />
                                        {formatDate(announcement.timestamp)}
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {announcement.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(announcement.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Delete Announcement"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-100 border-dashed">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 mb-4">
                            <Bell className="h-6 w-6 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Announcements Yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Create your first announcement to notify students.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
