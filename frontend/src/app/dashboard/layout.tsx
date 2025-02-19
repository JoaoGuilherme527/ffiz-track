/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Navbar from "@/src/components/custom/Navbar"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import Image from "next/image"
import Link from "next/link"
import {ReactNode, useEffect, useState} from "react"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isUser, setIsUser] = useState<any>()

    async function handleUser() {
        const user = await checkUserLogged()
        setIsUser(user.data)
    }

    useEffect(() => {
        handleUser()
    }, [])

    return (
        <div>
            <div className="z-40 absolute top-0 w-full h-[7%] bg-[var(--dark-green)] shadow-md flex justify-between items-center p-4">
                <Link href={"/"} className="active:scale-[0.9] transition-all">
                    <Image width={40} height={40} className="bg-white p-[1px] rounded shadow-sm" src="/favicon.svg" alt="logo Icon" />
                </Link>

                <p className="text-white text-sm">{isUser?.username ?? ""}</p>
            </div>

            {children}
            <Navbar />
        </div>
    )
}
