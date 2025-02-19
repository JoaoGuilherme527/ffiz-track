/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {ReactNode} from "react"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    return (
        <div>
            {children}
            <Navbar />
        </div>
    )
}
