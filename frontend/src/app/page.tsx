/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {useEffect, useLayoutEffect, useState} from "react"
import {Header} from "../components/custom/Header"
import {useGlobalContext} from "./providers/GlobalProvider"

export default function Home() {
    const {setIsMobile,isMobile} = useGlobalContext()
    useEffect(() => {
        setIsMobile(window.innerWidth <= 768)
    }, [])

    return (
        <div>
            <Header isMobile={isMobile} />
        </div>
    )
}
