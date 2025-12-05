"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    CreditCard,
    UserCog,
    IdCard,
    GraduationCap,
    LogOut
} from "lucide-react";

export default function Sidebar({ studentId }: { studentId: number | string }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: `/students/${studentId}/dashboard`, icon: LayoutDashboard },
        { name: "Courses", href: `/students/${studentId}/courses`, icon: BookOpen },
        { name: "Reg Card", href: `/students/${studentId}/reg-card`, icon: IdCard },
        { name: "Result", href: `/students/${studentId}/result`, icon: GraduationCap },
        { name: "Profile", href: `/students/${studentId}/profile`, icon: UserCog },
    ];

    return (
        <aside className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 hidden md:flex flex-col h-fit sticky top-8">
            <div className="p-4">
                <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</h2>
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
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group mt-4"
                    >
                        <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span className="font-medium">Logout</span>
                    </Link>
                </nav>
            </div>

            <div className="p-4 mt-auto border-t border-gray-100">
                <div className="px-4 py-2">
                    <p className="text-xs text-gray-400">© 2025 BA University</p>
                </div>
            </div>
        </aside>
    );
}
