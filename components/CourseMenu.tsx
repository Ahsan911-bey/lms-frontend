"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface CourseMenuProps {
    studentId: string;
    courseId: string; // Add courseId prop to build correct URLs
}

export default function CourseMenu({ studentId, courseId }: CourseMenuProps) { // Accept courseId
    const pathname = usePathname();
    // Base URL for course specific pages
    const baseUrl = `/students/${studentId}/courses/announcement`; // Note: The user asked for /courses/announcement redirection, but we need a base.
    // Actually, the user wants:
    // /students/12/courses -> Click -> /students/12/courses/announcement (which implies this is the "home" of the course view)
    // And the menu should have: CourseNotification, Attendance, Marks, LearningResources, Assignments

    // Let's define the structure.
    // If we are at /students/12/courses/announcement, we are viewing the announcements for the SELECTED course.
    // The URL doesn't seem to contain the course ID based on the user's request "redirect the user to another page... courses/announcement".
    // This implies the course ID is ONLY in the store.
    // HOWEVER, for a robust app, the ID should be in the URL.
    // BUT I must follow the user's request: "save the course id... redirect... to courses/announcement"
    // So the URL will be `/students/[id]/courses/announcement`. The course ID is in the store.

    const menuItems = [
        { name: "CourseNotification", href: `/students/${studentId}/courses/announcement` },
        { name: "Attendance", href: `/students/${studentId}/courses/attendance` },
        { name: "Marks", href: `/students/${studentId}/courses/marks` },
        { name: "LearningResources", href: `/students/${studentId}/courses/resources` },
        { name: "Assignments", href: `/students/${studentId}/courses/assignments` },
    ];

    return (
        <div className="bg-white border-b border-gray-200 mb-6">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors relative
                                    ${isActive
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }
                                `}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
