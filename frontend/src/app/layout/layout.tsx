/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import DashboardHeaderComponent from "./_components/DashboardHeader"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className={`overflow-hidden ${typeof window !== "undefined" ? window.localStorage.getItem("theme") : "dark"}`}>
            {/* Mobile */}
            <div className="flex flex-col h-dvh bg-white dark:bg-gray-950 justify-between overflow-hidden md:hidden">
                <DashboardHeaderComponent />
                {children}
                <Navbar />
            </div>

            {/* Desktop */}
            <div className="flex  bg-white dark:bg-gray-950 overflow-hidden h-dvh max-sm:hidden">
                <Navbar />
                <div className="w-dvw h-dvh overflow-hidden">
                    <DashboardHeaderComponent />
                    {children}
                </div>
            </div>
        </div>
    )
}
