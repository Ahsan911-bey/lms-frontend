"use client";

import Link from "next/link";
import { PlusCircle, List, Layers } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";

export default function BatchesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const actions = [
        {
            title: "Create New Batch",
            description: "Register a new student batch in the system.",
            href: `/admin/${id}/batches/create`,
            icon: PlusCircle,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:border-blue-200 group-hover:bg-blue-100"
        },
        {
            title: "View Batches",
            description: "List all registered batches.",
            href: `/admin/${id}/batches/view`,
            icon: List,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:border-purple-200 group-hover:bg-purple-100"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Batch Management</h1>
                <p className="text-gray-500 mt-1">Manage and organize student entries by batches.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actions.map((action, idx) => (
                    <Link
                        key={action.title}
                        href={action.href}
                    >
                        <motion.div
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`block p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 group h-full ${action.hover}`}
                        >
                            <div className={`h-14 w-14 ${action.color} rounded-2xl flex items-center justify-center mb-6 transition-transform shadow-inner`}>
                                <action.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{action.description}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
