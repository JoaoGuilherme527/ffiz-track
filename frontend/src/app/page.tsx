/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {useLayoutEffect, useState} from "react"
import {Header} from "../components/custom/Header"

export default function Home() {
    const [isMobile, setIsMobile] = useState(false)
    useLayoutEffect(() => {
        setIsMobile(window.innerWidth <= 768)
    }, [])

    return (
        <div>
            <Header isMobile={isMobile} />
        </div>
    )
}
