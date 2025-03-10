/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import DashboardHeaderComponent from "./_components/DashboardHeader"
import {useEffect, useState} from "react"
import {useGlobalContext} from "../providers/GlobalProvider"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const {isTheme} = useGlobalContext()
    const [theme, setTheme] = useState("")
    useEffect(() => {
        if (typeof window !== "undefined") {
            const newTheme = localStorage.getItem("theme")
            setTheme(newTheme ? newTheme : "dark")
        }
    }, [isTheme])
    return (
        <div className={`${theme}`}>
            {/* Mobile */}
            <div className="flex flex-col h-dvh bg-white dark:bg-gray-950 justify-between overflow-hidden md:hidden">
                <DashboardHeaderComponent />
                {children}
                <Navbar />
            </div>

            {/* Desktop */}
            <div className="flex bg-white h-lvh dark:bg-gray-950 overflow-hidden max-sm:hidden">
                <Navbar />
                <div className="w-dvw h-dvh relative pt-16">
                    <DashboardHeaderComponent />
                    {children}
                </div>
            </div>
        </div>
    )
}
