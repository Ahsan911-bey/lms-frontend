"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";

const PortalCard = ({
  href,
  title,
  description,
  icon: Icon,
  colorClass,
  delay,
}: {
  href: string;
  title: string;
  description: string;
  icon: any;
  colorClass: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href} className="group relative block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-1 border border-white/20 dark:bg-black/40 dark:border-white/10 dark:hover:bg-black/60">
          <div
            className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${colorClass}`}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 shadow-inner backdrop-blur-sm ${colorClass} bg-opacity-20`}>
              <Icon className="h-8 w-8 text-zinc-800 dark:text-zinc-100" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
              {title}
            </h3>

            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
              {description}
            </p>

            <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-zinc-900 group-hover:gap-3 transition-all dark:text-white">
              Enter Portal <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:bg-purple-900/30"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:bg-yellow-900/30"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-pink-900/30"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale"></div>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <div className="mb-8 relative h-32 w-80 sm:h-40 sm:w-96 drop-shadow-2xl">
            <Image
              src="/logo.webp"
              alt="University Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
            University Portal
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
            Welcome to the centralized access point for students, teachers, and administrators.
            Please select your portal to continue.
          </p>
        </motion.div>

        <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PortalCard
            href="/students"
            title="Student Portal"
            description="Access your dashboard, view grades, attendance, and course materials."
            icon={GraduationCap}
            colorClass="bg-blue-500"
            delay={0.2}
          />

          <PortalCard
            href="/teachers"
            title="Teacher Portal"
            description="Manage your classes, upload assignments, and record student attendance."
            icon={BookOpen}
            colorClass="bg-emerald-500"
            delay={0.4}
          />

          <PortalCard
            href="/admin"
            title="Admin Portal"
            description="Oversee university operations, manage users, and configure system settings."
            icon={ShieldCheck}
            colorClass="bg-purple-500"
            delay={0.6}
          />
        </div>
      </main>
    </div>
  );
}
