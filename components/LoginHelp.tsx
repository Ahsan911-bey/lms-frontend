import { useState, useEffect } from "react";
import { Info, Key, User, Shield, Users, X, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginHelpProps {
    role: "student" | "teacher" | "admin";
}

export default function LoginHelp({ role }: LoginHelpProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Auto-open after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getRoleInfo = () => {
        switch (role) {
            case "admin":
                return {
                    title: "Admin Demo",
                    icon: Shield,
                    color: "text-violet-600 dark:text-violet-400",
                    bgColor: "bg-violet-50 dark:bg-violet-900/40",
                    borderColor: "border-violet-200 dark:border-violet-700",
                    buttonColor: "bg-violet-600 hover:bg-violet-700",
                    credentials: [
                        { label: "ID", value: "1" },
                        { label: "Password", value: "admin123" }
                    ],
                    note: "Full system access"
                };
            case "teacher":
                return {
                    title: "Teacher Demo",
                    icon: User,
                    color: "text-teal-600 dark:text-teal-400",
                    bgColor: "bg-teal-50 dark:bg-teal-900/40",
                    borderColor: "border-teal-200 dark:border-teal-700",
                    buttonColor: "bg-teal-600 hover:bg-teal-700",
                    credentials: [
                        { label: "IDs", value: "2 - 15" },
                        { label: "Password", value: "password" }
                    ],
                    note: "Faculty portal access"
                };
            case "student":
                return {
                    title: "Student Demo",
                    icon: Users,
                    color: "text-blue-600 dark:text-blue-400",
                    bgColor: "bg-blue-50 dark:bg-blue-900/40",
                    borderColor: "border-blue-200 dark:border-blue-700",
                    buttonColor: "bg-blue-600 hover:bg-blue-700",
                    credentials: [
                        { label: "IDs", value: "16 - 61" },
                        { label: "Password", value: "password" }
                    ],
                    note: "Student portal access"
                };
        }
    };

    const info = getRoleInfo();
    const Icon = info.icon;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-4 w-72 rounded-xl border ${info.borderColor} ${info.bgColor} p-4 shadow-2xl backdrop-blur-md`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg bg-white/80 dark:bg-black/20 ${info.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className={`text-sm font-bold ${info.color}`}>{info.title}</h3>
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Test Credentials</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="h-4 w-4 text-zinc-400" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {info.credentials.map((cred, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white/60 dark:bg-black/20 rounded px-3 py-2 border border-black/5 dark:border-white/5">
                                    <span className="text-xs font-medium text-zinc-500">{cred.label}</span>
                                    <code className="text-sm font-mono font-bold text-zinc-700 dark:text-zinc-200 select-all">
                                        {cred.value}
                                    </code>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 justify-center text-[10px] text-zinc-400 opacity-80">
                            <Info className="h-3 w-3" />
                            <span>IDs assigned purely sequentially</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-lg shadow-black/20 ${info.buttonColor} transition-colors`}
            >
                {isOpen ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <Key className="h-5 w-5" />
                )}
                <span className="font-semibold text-sm">Demo Login</span>
            </motion.button>
        </div>
    );
}
