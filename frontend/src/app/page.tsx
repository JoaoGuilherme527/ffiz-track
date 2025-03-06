/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from "next/link"
import HomeHeader from "../components/custom/HomeHeader"
import Image from "next/image"
import {motion} from "framer-motion"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"

export default function Home() {
    const router = useRouter()
    const [mousePos, setMousePos] = useState({x: -100, y: -100})
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            setMousePos({x: event.clientX, y: event.clientY})
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])
    return (
        <div className="h-dvh flex flex-col">
            <HomeHeader />
            <div className="flex flex-col items-center ">
                {/* Hero Section */}
                <header className="relative text-white md:gap-20 gap-30 bg-gradient-to-br from-gray-950 md:px-40 px-10 md:py-40 py-10 h-svh to-gray-800 w-full flex flex-col overflow-hidden">
                    <div
                        className={`absolute w-50 h-50 bg-white rounded-full opacity-5 shadow-white`}
                        style={{transform: `translate(${mousePos.x - 260}px,${mousePos.y - 322}px)`, boxShadow: "0 0 80px 80px #fff"}}
                    />
                    <div className="z-0 absolute md:px-50 px-20 max-sm:py-20 top-0 left-0 w-full h-full bg-green-950 opacity-30 flex md:items-center justify-end ">
                        <motion.div
                            initial={{translateX: "100%", opacity: 0}}
                            transition={{duration: 0.4, ease: "easeIn"}}
                            animate={{translateX: "0", opacity: 0.8, animation: "forwards"}}
                            className="opacity-5"
                        >
                            <Image
                                width={500}
                                height={500}
                                src="/logo_white.png"
                                alt="logo Icon"
                                className="opacity-5 animate-pulse duration-6000"
                            />
                        </motion.div>
                    </div>
                    <div className="z-10 md:gap-10 gap-20 flex flex-col">
                        <motion.h1
                            initial={{translateX: "-50%", opacity: 0}}
                            transition={{duration: 0.4, ease: "easeIn"}}
                            animate={{translateX: "0", opacity: 1, animation: "forwards"}}
                            className="md:text-7xl text-5xl  font-bold tracking-wide"
                        >
                            FFizTrack
                        </motion.h1>
                        <div className="flex flex-col md:gap-3 gap-5 text-gray-300">
                            <motion.h2
                                initial={{translateX: "-50%", opacity: 0}}
                                transition={{duration: 0.4, ease: "easeIn", delay: 0.1}}
                                animate={{translateX: "0", opacity: 1, animation: "forwards"}}
                                className="md:text-4xl text-3xl font-normal"
                            >
                                Take Control of Your Finances
                            </motion.h2>
                            <motion.p
                                initial={{translateX: "-50%", opacity: 0}}
                                transition={{duration: 0.4, ease: "easeIn", delay: 0.2}}
                                animate={{translateX: "0", opacity: 1, animation: "forwards"}}
                                className="text-base"
                            >
                                Track your expenses, monitor your profits, and stay on top of your budget.
                            </motion.p>
                        </div>
                    </div>
                    <div
                        className="z-10 md:w-1/3  px-6 py-3 bg-[#03071250] rounded-lg hover:bg-[#00823550]  cursor-pointer overflow-hidden relative"
                        onClick={() => router.push("/signup")}
                    >
                        <motion.div
                            initial={{left: "-35%"}}
                            animate={{left: ["-35%", "120%"]}}
                            transition={{duration: 5, ease: "easeIn", repeat: Infinity}}
                            style={{
                                boxShadow: "0 0 50px 60px #00a63e",
                            }}
                            className=" absolute h-full w-5 bg-green-600 z-0 opacity-5"
                        ></motion.div>
                        <p className="z-20 text-white text-2xl font-bold text-center relative">Get Started</p>
                    </div>
                </header>

                {/* Features Section */}
                <section className="py-16 bg-white text-black text-center w-full flex justify-center">
                    {/* <div className="max-w-6xl w-full">
                        <h2 className="text-3xl font-semibold">Why Choose FFizTrack?</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Track Expenses</h3>
                                <p className="mt-2 text-gray-600">Easily log and categorize your expenses.</p>
                            </div>
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Monitor Profits</h3>
                                <p className="mt-2 text-gray-600">Keep an eye on your income sources effortlessly.</p>
                            </div>
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Visual Insights</h3>
                                <p className="mt-2 text-gray-600">Get clear, intuitive financial summaries.</p>
                            </div>
                        </div>
                    </div> */}
                </section>

                {/* Call to Action */}
                <footer className="text-center py-10 max-w-4xl w-full">
                    <h2 className="text-2xl font-semibold">Start Managing Your Finances Today</h2>
                    <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Sign Up Now</button>
                </footer>
            </div>
        </div>
    )
}
