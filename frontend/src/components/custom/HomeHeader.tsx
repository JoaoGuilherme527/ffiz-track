"use client"

import {useState, useEffect} from "react"
import {checkUserLogged} from "@/src/data/actions/auth-actions"
import Image from "next/image"
import Link from "next/link"

export default function HomeHeader() {
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
        <div className="flex justify-between items-center p-4 shadow-sm bg-gray-950 h-16">
            <Image width={20} height={20} src="/logo_white.png" alt="logo Icon" />

            {isLoading ? (
                <div className="bg-gray-600  text-white px-5 py-1 rounded-sm">
                    <p className="font-semibold text-left text-sm animate-pulse">Loading...</p></div>
            ) : isLogged ? (
                <Link
                prefetch={true}
                    href="/layout/dashboard"
                    className={`font-semibold text-left text-sm px-5 py-1 text-white bg-green-600 rounded-sm`}
                >
                    Dashboard
                </Link>
            ) : (
                <div className="flex space-x-4 items-center gap-4">
                    <Link className="font-semibold text-left text-base px-3 py-1 text-white" href={"/signin"} prefetch={true}>
                        Login
                    </Link>
                    <Link
                        className="font-semibold text-left text-base bg-green-600 text-white rounded-sm px-3 py-1"
                        href={"/signup"}
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    )
}
