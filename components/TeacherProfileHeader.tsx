import { Teacher } from "@/lib/api";

export default function TeacherProfileHeader({ teacher }: { teacher: Teacher }) {
    return (
        <div className="relative overflow-hidden bg-slate-900 border-b border-gray-800 shadow-2xl">
            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950"></div>
                {/* Soft Glow Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>
            </div>

            {/* University Header Text */}
            <div className="absolute top-5 left-6 z-10 flex items-center gap-3">
                <div className="h-8 w-1 bg-teal-400 rounded-full"></div>
                <div>
                    <h2 className="text-sm font-bold text-white tracking-widest uppercase font-sans leading-none">
                        BA University
                    </h2>
                    <p className="text-[10px] text-teal-200 uppercase tracking-[0.2em] font-medium leading-none mt-1">
                        Sahiwal Campus
                    </p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">
                {/* Glassmorphism Card */}
                <div className="flex flex-col md:flex-row items-center gap-8 backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/10 shadow-xl ring-1 ring-black/5">
                    {/* Profile Picture */}
                    <div className="relative h-28 w-28 md:h-36 md:w-36 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-teal-500 blur-md opacity-50"></div>
                        <img
                            src={teacher.profilePic || `https://ui-avatars.com/api/?name=${teacher.name}&background=random`}
                            alt={teacher.name}
                            className="relative h-full w-full rounded-full object-cover border-4 border-white/20 shadow-2xl"
                        />
                        <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-4 border-emerald-900 rounded-full"></div>
                    </div>

                    {/* Teacher Info */}
                    <div className="flex-1 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">{teacher.name}</h1>
                                <p className="text-teal-200 font-medium text-lg mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <span className="opacity-70">ID:</span> {teacher.regNo}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-500/20 text-teal-100 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                                    {teacher.program}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-white/10 pt-6">
                            <div className="group">
                                <span className="block text-teal-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-teal-200 transition-colors">Qualification</span>
                                <span className="font-bold text-white text-lg">{teacher.qualification}</span>
                            </div>
                            <div className="group">
                                <span className="block text-teal-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-teal-200 transition-colors">Specialization</span>
                                <span className="font-bold text-white text-lg">{teacher.specialization}</span>
                            </div>
                            <div className="group">
                                <span className="block text-teal-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-teal-200 transition-colors">Campus</span>
                                <span className="font-bold text-white text-lg">{teacher.campus}</span>
                            </div>
                            <div className="group">
                                <span className="block text-teal-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-teal-200 transition-colors">Session</span>
                                <span className="font-bold text-white text-lg">{teacher.session}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
