"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    School,
    GraduationCap,
    BookOpen,
    LogOut,
    PlusCircle,
    Layers,
    FolderOpen
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar({ adminId }: { adminId: number | string }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: `/admin/${adminId}/dashboard`, icon: LayoutDashboard },
        { name: "Teachers", href: `/admin/${adminId}/teachers`, icon: School },
        { name: "Students", href: `/admin/${adminId}/students`, icon: GraduationCap },
        { name: "Courses", href: `/admin/${adminId}/courses`, icon: BookOpen },
        { name: "Assignments", href: `/admin/${adminId}/assign`, icon: Layers },
        { name: "Batches", href: `/admin/${adminId}/batches`, icon: FolderOpen },
    ];

    return (
        <aside className="w-64 hidden md:flex flex-col h-fit sticky top-8 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/50 ring-1 ring-black/5">
                <h2 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Admin Menu</h2>
                <nav className="space-y-1 relative">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? "text-purple-700" : "text-gray-600 hover:text-purple-600"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-purple-50/80 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center">
                                    <item.icon
                                        className={`h-5 w-5 mr-3 transition-colors ${isActive
                                            ? "text-purple-600"
                                            : "text-gray-400 group-hover:text-purple-600"
                                            }`}
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </span>
                            </Link>
                        );
                    })}

                    <div className="my-4 border-t border-gray-100/50 mx-2"></div>

                    {/* Logout Option */}
                    <div
                        onClick={async () => {
                            const { logout } = await import("@/lib/auth");
                            logout();
                        }}
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    >
                        <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="font-medium">Logout</span>
                        <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10"></div>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
