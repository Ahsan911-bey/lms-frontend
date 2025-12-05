import { Student } from "@/lib/api";

export default function ProfileHeader({ student }: { student: Student }) {
    return (
        <div className="relative overflow-hidden bg-slate-900 border-b border-gray-800 shadow-2xl">
            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950"></div>
                {/* Soft Glow Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>
            </div>

            {/* University Header Text */}
            <div className="absolute top-5 left-6 z-10 flex items-center gap-3">
                <div className="h-8 w-1 bg-blue-400 rounded-full"></div>
                <div>
                    <h2 className="text-sm font-bold text-white tracking-widest uppercase font-sans leading-none">
                        BA University
                    </h2>
                    <p className="text-[10px] text-blue-200 uppercase tracking-[0.2em] font-medium leading-none mt-1">
                        Sahiwal Campus
                    </p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">
                {/* Glassmorphism Card */}
                <div className="flex flex-col md:flex-row items-center gap-8 backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/10 shadow-xl ring-1 ring-black/5">
                    {/* Profile Picture */}
                    <div className="relative h-28 w-28 md:h-36 md:w-36 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-50"></div>
                        <img
                            src={student.profilePic || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                            alt={student.name}
                            className="relative h-full w-full rounded-full object-cover border-4 border-white/20 shadow-2xl"
                        />
                        <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-4 border-indigo-900 rounded-full"></div>
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">{student.name}</h1>
                                <p className="text-blue-200 font-medium text-lg mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <span className="opacity-70">Reg No:</span> {student.regNo}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-100 border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                    {student.program}
                                </span>
                            </div>
                        </div >

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-white/10 pt-6">
                            <div className="group">
                                <span className="block text-blue-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-blue-200 transition-colors">Class</span>
                                <span className="font-bold text-white text-lg">{student.className}</span>
                            </div>
                            <div className="group">
                                <span className="block text-blue-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-blue-200 transition-colors">CGPA</span>
                                <span className="font-bold text-white text-lg">{student.cgpa.toFixed(2)}</span>
                            </div>
                            <div className="group">
                                <span className="block text-blue-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-blue-200 transition-colors">Campus</span>
                                <span className="font-bold text-white text-lg">{student.campus}</span>
                            </div>
                            <div className="group">
                                <span className="block text-blue-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-blue-200 transition-colors">Session</span>
                                <span className="font-bold text-white text-lg">{student.session}</span>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
}
