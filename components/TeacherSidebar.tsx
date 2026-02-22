"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BookOpen,
    UserCog,
    LogOut,
    FileCog,
    Users,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherSidebar({ teacherId }: { teacherId: number | string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const menuItems = [
        { name: "Dashboard", href: `/teachers/${teacherId}/dashboard`, icon: LayoutDashboard },
        { name: "Courses", href: `/teachers/${teacherId}/courses`, icon: BookOpen },
        { name: "Students", href: `/teachers/${teacherId}/students`, icon: Users },
        { name: "Course Actions", href: `/teachers/${teacherId}/course-actions`, icon: FileCog },
        { name: "Profile", href: `/teachers/${teacherId}/profile`, icon: UserCog },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/50 ring-1 ring-black/5 h-full">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>
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
                            const { logoutAction } = await import("@/app/actions/auth");
                            logoutAction();
                        }}
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    >
                        <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="font-medium">Logout</span>
                        <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10"></div>
                    </div>
                </nav>
            </div>
        </div>
    );

    return (
        <>
            <aside className="w-64 hidden md:flex flex-col h-fit sticky top-8 space-y-6">
                <SidebarContent />
            </aside>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed bottom-6 left-6 z-50 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors"
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl z-50 md:hidden shadow-2xl overflow-y-auto p-4"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
