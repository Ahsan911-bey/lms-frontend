import { Users, BookOpen, GraduationCap, School } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <School size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Teachers</p>
                        <h3 className="text-2xl font-bold text-gray-900">--</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Students</p>
                        <h3 className="text-2xl font-bold text-gray-900">--</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Courses</p>
                        <h3 className="text-2xl font-bold text-gray-900">--</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Users</p>
                        <h3 className="text-2xl font-bold text-gray-900">--</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center py-20">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Admin Portal</h3>
                <p className="text-gray-500">Select an option from the sidebar to manage Teachers, Students, and Courses.</p>
            </div>
        </div>
    );
}
