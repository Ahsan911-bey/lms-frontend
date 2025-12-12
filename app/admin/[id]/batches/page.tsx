import Link from "next/link";
import { PlusCircle, List, ArrowLeft } from "lucide-react";

export default async function BatchesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const actions = [
        {
            title: "Create New Batch",
            description: "Register a new student batch in the system.",
            href: `/admin/${id}/batches/create`,
            icon: PlusCircle,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200"
        },
        {
            title: "View Batches",
            description: "List all registered batches.",
            href: `/admin/${id}/batches/view`,
            icon: List,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:border-purple-200"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                {/* Optional Back button if deep navigation, but this is a main section */}
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Batch Management</h1>
                <p className="text-gray-500">Manage student batches.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className={`block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${action.hover}`}
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
        </div>
    );
}
