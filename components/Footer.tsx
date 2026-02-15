"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Github, Code2 } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    const getTheme = () => {
        // Students Portal - Refined Dark with Clean Blue Accents
        if (pathname.startsWith("/students")) {
            return {
                bg: "bg-slate-950 border-t border-slate-800",
                text: "text-slate-400",
                heading: "text-white",
                iconBg: "bg-slate-900 border border-slate-700 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300",
                accent: "text-blue-400",
                hoverText: "hover:text-blue-400 transition-colors",
                bullet: "bg-blue-500",
                border: "border-slate-800",
                devBadge: "bg-slate-900/60 border border-slate-700 backdrop-blur-sm"
            };
        }
        // Teachers Portal - Dark with Teal Accents
        if (pathname.startsWith("/teachers")) {
            return {
                bg: "bg-slate-950 border-t border-slate-800",
                text: "text-slate-400",
                heading: "text-white",
                iconBg: "bg-slate-900 border border-slate-700 text-teal-400 hover:bg-teal-600 hover:text-white hover:border-teal-500 transition-all duration-300",
                accent: "text-teal-400",
                hoverText: "hover:text-teal-400 transition-colors",
                bullet: "bg-teal-500",
                border: "border-slate-800",
                devBadge: "bg-slate-900/60 border border-slate-700 backdrop-blur-sm"
            };
        }
        // Admin Portal - Dark with Purple Accents
        if (pathname.startsWith("/admin")) {
            return {
                bg: "bg-slate-950 border-t border-slate-800",
                text: "text-slate-400",
                heading: "text-white",
                iconBg: "bg-slate-900 border border-slate-700 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all duration-300",
                accent: "text-purple-400",
                hoverText: "hover:text-purple-400 transition-colors",
                bullet: "bg-purple-500",
                border: "border-slate-800",
                devBadge: "bg-slate-900/60 border border-slate-700 backdrop-blur-sm"
            };
        }
        // Default / Home - Standard Dark Theme
        return {
            bg: "bg-zinc-950 border-t border-zinc-800",
            text: "text-zinc-400",
            heading: "text-white",
            iconBg: "bg-zinc-900 text-emerald-400 border-emerald-900/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
            accent: "text-white",
            hoverText: "hover:text-white",
            bullet: "bg-zinc-600 group-hover:bg-emerald-500",
            border: "border-zinc-800",
            devBadge: "bg-zinc-900/50 border-zinc-800"
        };
    };

    const theme = getTheme();

    return (
        <footer className={`w-full border-t ${theme.bg} ${theme.text} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className={`relative h-12 w-48 transition-opacity opacity-90 hover:opacity-100`}>
                            <Image
                                src="/logo.webp"
                                alt="University Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className={`${theme.text} text-sm leading-relaxed max-w-sm`}>
                            Empowering future leaders through excellence in education, research, and innovation. Experience the next generation of academic management.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="https://github.com/Ahsan911-bey" icon={Github} label="GitHub" theme={theme} />
                            <SocialLink href="https://www.linkedin.com/in/ahsan-shahzad-a59b45346" icon={Linkedin} label="LinkedIn" theme={theme} />
                            <SocialLink href="mailto:thenightmare99xx@gmail.com" icon={Mail} label="Email" theme={theme} />
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h3 className={`font-bold mb-6 flex items-center gap-2 ${theme.heading}`}>
                            <ArrowRight className={`w-4 h-4 ${theme.accent}`} /> Quick Access
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink href="/" label="Home" theme={theme} />
                            <FooterLink href="/students" label="Student Portal" theme={theme} />
                            <FooterLink href="/teachers" label="Teacher Portal" theme={theme} />
                            <FooterLink href="/admin" label="Admin Console" theme={theme} />
                        </ul>
                    </div>

                    {/* Contact Info (Developer) */}
                    <div>
                        <h3 className={`font-bold mb-6 flex items-center gap-2 ${theme.heading}`}>
                            <Code2 className={`w-4 h-4 ${theme.accent}`} /> Developer Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm">
                                <Mail className={`w-5 h-5 shrink-0 mt-0.5 ${theme.accent}`} />
                                <div className="flex flex-col">
                                    <span className={`text-xs uppercase tracking-wider font-semibold mb-1 opacity-70`}>Email</span>
                                    <Link href="mailto:thenightmare99xx@gmail.com" className={`${theme.hoverText} transition-colors font-medium`}>
                                        thenightmare99xx@gmail.com
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <Linkedin className={`w-5 h-5 shrink-0 mt-0.5 ${theme.accent}`} />
                                <div className="flex flex-col">
                                    <span className={`text-xs uppercase tracking-wider font-semibold mb-1 opacity-70`}>LinkedIn</span>
                                    <Link href="https://www.linkedin.com/in/ahsan-shahzad-a59b45346" target="_blank" className={`${theme.hoverText} transition-colors font-medium`}>
                                        Ahsan Shahzad
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`pt-8 border-t ${theme.border} flex flex-col md:flex-row justify-between items-center gap-4`}>
                    <p className={`text-sm text-center md:text-left opacity-70`}>
                        © {currentYear} CUI Sahiwal. All rights reserved.
                    </p>

                    <div className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border ${theme.devBadge}`}>
                        <span className="opacity-70">Developed by:</span>
                        <Link
                            href="https://ahsanshahzad.vercel.app/"
                            target="_blank"
                            className={`font-bold underline decoration-2 transition-colors ${theme.accent} hover:opacity-80`}
                        >
                            Ahsan
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon, label, theme }: { href: string; icon: any; label: string, theme: any }) {
    return (
        <Link
            href={href}
            target="_blank"
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border shadow-sm ${theme.iconBg}`}
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </Link>
    );
}

function FooterLink({ href, label, theme }: { href: string; label: string, theme: any }) {
    return (
        <li>
            <Link
                href={href}
                className={`group flex items-center gap-2 ${theme.hoverText} transition-colors text-sm`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet} transition-colors`}></span>
                {label}
            </Link>
        </li>
    );
}
