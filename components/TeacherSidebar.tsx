"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    UserCog,
    LogOut,
    FileCog,
    Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function TeacherSidebar({ teacherId }: { teacherId: number | string }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: `/teachers/${teacherId}/dashboard`, icon: LayoutDashboard },
        { name: "Courses", href: `/teachers/${teacherId}/courses`, icon: BookOpen },
        { name: "Students", href: `/teachers/${teacherId}/students`, icon: Users },
        { name: "Course Actions", href: `/teachers/${teacherId}/course-actions`, icon: FileCog },
        { name: "Profile", href: `/teachers/${teacherId}/profile`, icon: UserCog },
    ];

    return (
        <aside className="w-64 hidden md:flex flex-col h-fit sticky top-8 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/50 ring-1 ring-black/5">
                <h2 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Menu</h2>
                <nav className="space-y-1 relative">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? "text-blue-700" : "text-gray-600 hover:text-blue-600"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-50/80 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center">
                                    <item.icon
                                        className={`h-5 w-5 mr-3 transition-colors ${isActive
                                            ? "text-blue-600"
                                            : "text-gray-400 group-hover:text-blue-600"
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

            {/* <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                <h3 className="font-bold text-lg relative z-10">Coming Soon</h3>
                <p className="text-blue-100 text-sm mt-1 mb-4 relative z-10">New features are on the way!</p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors border border-white/20 relative z-10 cursor-pointer">
                    Contact Support
                </button>
            </div> */}
        </aside>
    );
}
