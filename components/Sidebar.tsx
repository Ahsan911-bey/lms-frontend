"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BookOpen,
    CreditCard,
    UserCog,
    IdCard,
    GraduationCap,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ studentId }: { studentId: number | string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const menuItems = [
        { name: "Dashboard", href: `/students/${studentId}/dashboard`, icon: LayoutDashboard },
        { name: "Courses", href: `/students/${studentId}/courses`, icon: BookOpen },
        { name: "Reg Card", href: `/students/${studentId}/reg-card`, icon: IdCard },
        { name: "Result", href: `/students/${studentId}/result`, icon: GraduationCap },
        { name: "Profile", href: `/students/${studentId}/profile`, icon: UserCog },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <div className="flex items-center justify-between mb-2 md:mb-0">
                    <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                            >
                                <item.icon
                                    className={`h-5 w-5 mr-3 transition-colors ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-400 group-hover:text-blue-600"
                                        }`}
                                />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}

                    {/* Logout Option */}
                    <div
                        onClick={async () => {
                            const { logout } = await import("@/lib/auth");
                            logout();
                        }}
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group mt-4 cursor-pointer"
                    >
                        <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span className="font-medium">Logout</span>
                    </div>
                </nav>
            </div>

            <div className="p-4 mt-auto border-t border-gray-100">
                <div className="px-4 py-2">
                    <p className="text-xs text-gray-400">© 2025 CUI</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 hidden md:flex flex-col h-fit sticky top-8">
                <SidebarContent />
            </aside>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed bottom-6 left-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-2xl overflow-y-auto"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
