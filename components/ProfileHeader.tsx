import { Student } from "@/lib/api";

export default function ProfileHeader({ student }: { student: Student }) {
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Picture */}
                    <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0">
                        <img
                            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                            alt={student.name}
                            className="h-full w-full rounded-full object-cover border-4 border-white shadow-md"
                        />
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
                                <p className="text-gray-500 font-medium text-lg">{student.regNo}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {student.program}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-100 pt-4">
                            <div>
                                <span className="block text-gray-400 text-xs uppercase tracking-wider font-semibold">Class</span>
                                <span className="font-medium text-gray-700">{student.className}</span>
                            </div>
                            <div>
                                <span className="block text-gray-400 text-xs uppercase tracking-wider font-semibold">CGPA</span>
                                <span className="font-bold text-blue-600">{student.cgpa.toFixed(2)}</span>
                            </div>
                            <div>
                                <span className="block text-gray-400 text-xs uppercase tracking-wider font-semibold">Campus</span>
                                <span className="font-medium text-gray-700">{student.campus}</span>
                            </div>
                            <div>
                                <span className="block text-gray-400 text-xs uppercase tracking-wider font-semibold">Session</span>
                                <span className="font-medium text-gray-700">{student.session}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
