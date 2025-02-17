"use client"

import {useState, useEffect} from "react"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
    isMobile: boolean
}

export function Header({isMobile}: HeaderProps) {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchUserStatus() {
            const result = await checkUserLogged()
            setIsLogged(result.ok)
            setIsLoading(false)
        }
        fetchUserStatus()
    }, [])

    return (
        <div className="flex justify-between items-center p-4 shadow">
            <Image width={40} height={40} src="/favicon.png" alt="logo Icon" />

            {isLoading ? (
                <div className=" bg-gray-300 font-semibold text-left text-base text-white px-10 py-2 rounded-sm">Loading...</div>
            ) : isLogged ? (
                <Link
                    href="/dashboard"
                    className={`font-semibold text-left ${
                        isMobile ? "text-sm   px-5 py-1 " : "text-base  bg-gray-900 px-10 py-2"
                    } text-white bg-gray-900 rounded-sm`}
                >
                    Dashboard
                </Link>
            ) : (
                <div className="flex space-x-4 items-center">
                    <Link className="font-semibold text-left text-base" href={"/signin"}>
                        Signin
                    </Link>
                    <Link className="font-semibold text-left text-sm bg-gray-900 text-white rounded-sm px-3 py-1" href={"/signup"}>
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    )
}
