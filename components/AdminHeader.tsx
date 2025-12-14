import { Admin } from "@/lib/api";

export default function AdminHeader({ admin }: { admin: Admin }) {
    return (
        <div className="relative overflow-hidden bg-slate-900 border-b border-gray-800 shadow-2xl">
            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-indigo-900 to-violet-950"></div>
                {/* Soft Glow Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>
            </div>

            {/* University Header Text */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <img src="https://swl-cms.comsats.edu.pk/images/logo.png" alt="CUI Logo" className="h-22 w-auto object-contain" />
                <div className="h-8 w-1 bg-violet-400 rounded-full"></div>
                <div>
                    <h2 className="text-sm font-bold text-white tracking-widest uppercase font-sans leading-none">
                        CUI
                    </h2>
                    <p className="text-[10px] text-violet-200 uppercase tracking-[0.2em] font-medium leading-none mt-1">
                        Admin Portal
                    </p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">
                {/* Glassmorphism Card */}
                <div className="flex flex-col md:flex-row items-center gap-8 backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/10 shadow-xl ring-1 ring-black/5">
                    {/* Admin Icon/Profile Placeholder */}
                    <div className="relative h-28 w-28 md:h-36 md:w-36 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-violet-500 blur-md opacity-50"></div>
                        <div className="relative h-full w-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-white/20 shadow-2xl overflow-hidden">
                            <img
                                src={admin.profilePic || `https://ui-avatars.com/api/?name=${admin.name}&background=6366f1&color=fff`}
                                alt={admin.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-4 border-indigo-900 rounded-full"></div>
                    </div>

                    {/* Admin Info */}
                    <div className="flex-1 text-center md:text-left w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">{admin.name}</h1>
                                <p className="text-violet-200 font-medium text-lg mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <span className="opacity-70">Role:</span> {admin.designation}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-violet-500/20 text-violet-100 border border-violet-400/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                    Active Session: {admin.session}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-white/10 pt-6">
                            <div className="group">
                                <span className="block text-violet-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-violet-200 transition-colors">Access Level</span>
                                <span className="font-bold text-white text-lg">Full Control</span>
                            </div>
                            <div className="group">
                                <span className="block text-violet-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-violet-200 transition-colors">Campus</span>
                                <span className="font-bold text-white text-lg">{admin.campus}</span>
                            </div>
                            <div className="group">
                                <span className="block text-violet-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-violet-200 transition-colors">Department</span>
                                <span className="font-bold text-white text-lg">{admin.department}</span>
                            </div>
                            <div className="group">
                                <span className="block text-violet-300/70 text-xs uppercase tracking-wider font-semibold mb-1 group-hover:text-violet-200 transition-colors">Status</span>
                                <span className="font-bold text-white text-lg">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
