"use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    // Disabling global page transition to prevent conflict with inner page animations
    // and "double animation" effect reported by user.
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
}
