import Link from "next/link";
import { BookPlus, Users, UserPlus, Layers } from "lucide-react";

export default async function CoursesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const actions = [
        {
            title: "Create New Course",
            description: "Register a new subject in the university curriculum.",
            href: `/admin/${id}/courses/create`,
            icon: BookPlus,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200"
        },
        {
            title: "Assign Batch",
            description: "Enroll a batch of students into the system.",
            href: `/admin/${id}/courses/assign-batch`,
            icon: Layers,
            color: "bg-orange-50 text-orange-600",
            hover: "hover:border-orange-200"
        },
        {
            title: "Assign Teacher to Course",
            description: "Allocate faculty members to specific courses.",
            href: `/admin/${id}/courses/assign-teacher`,
            icon: UserPlus,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:border-purple-200"
        },
        {
            title: "Assign Students to Course",
            description: "Enroll students into specific course sections.",
            href: `/admin/${id}/courses/assign-students`,
            icon: Users,
            color: "bg-green-50 text-green-600",
            hover: "hover:border-green-200"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                <p className="text-gray-500">Manage curriculum, faculty allocations, and enrollments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className={`block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 shadow-sm hover:shadow-md ${action.hover}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{action.description}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${action.color}`}>
                                <action.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Placeholder for Course List if we had an endpoint */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <h3 className="text-gray-400 font-medium">Course Directory</h3>
                <p className="text-gray-400 text-sm">Course listing feature coming soon.</p>
            </div>
        </div>
    );
}
