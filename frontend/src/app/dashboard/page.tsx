/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {formatShortBRL, formatTime, formatUSDtoBRL} from "@/src/lib/utils"
import {useGlobalContext} from "../providers/GlobalProvider"
import {useEffect, useLayoutEffect, useState, useTransition} from "react"
import Image from "next/image"
import Loading from "../loading"
import {StaticImport} from "next/dist/shared/lib/get-img-props"

interface DashboardCardProps {
    src: string | StaticImport
    title: string
    value: string
    description: string
    variant?: boolean
}

const DashboardCard = ({src, title, value, description, variant}: DashboardCardProps) => (
    <div
        className={`relative p-4 border-[1px] border-gray-300  rounded-md flex flex-col  items-start justify-evenly flex-1 text-gray-700 shadow-sm gap-2 ${
            variant ? "bg-green-500" : "bg-white"
        }`}
    >
        <div className={`rounded-full   ${variant ? "bg-white" : "bg-gray-50"}`}>
            <Image src={src} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
        </div>
        <h1 className={`font-bold text-sm   ${variant ? "text-white" : "text-gray-400"}`}>{title}</h1>
        <p className={`font-extrabold text-xl  ${variant ? "text-white" : ""}`}>{value}</p>
        <p className="text-gray-400 text-sm font-normal">{description}</p>
    </div>
)

export default function DashboardRoute() {
    const {currentExpense, currentProfits, transactionItems, fetchTransactions} = useGlobalContext()
    const [pending, startTransition] = useTransition()
    const [categoryMaxOcc, setCategoryMaxOcc] = useState<{element: string | null; occurred: number}>({element: "Other", occurred: 0})
    const [totalCategoryAmount, setTotalCategoryAmount] = useState(0)
    useLayoutEffect(() => {
        startTransition(() => {
            fetchTransactions().then(({expenses}) => {
                const arr = expenses.map(({category}) => category)
                let maxOcc: {element: string | null; occurred: number} = {element: null, occurred: 0}

                const mostOcc = arr.reduce((acc: {[key: string]: number}, el) => {
                    if (el !== undefined) {
                        acc[el] = acc[el] ? acc[el] + 1 : 1
                    }
                    if (el !== undefined && acc[el] > maxOcc.occurred) {
                        maxOcc = {element: el, occurred: acc[el]}
                    }
                    return acc
                }, {})

                const amountMostOcc = expenses
                    .filter(({category}) => category === maxOcc.element)
                    .map(({amount}) => amount)
                    .reduce((acc, crr) => acc + crr)

                setTotalCategoryAmount(amountMostOcc)
                setCategoryMaxOcc(maxOcc)
            })
        })
    }, [])

    return (
        <>
            {pending ? <Loading /> : <></>}

            {/* Desktop */}
            {/* <div className="w-full h-full flex-col flex max-sm:hidden p-6">
                <div className="flex gap-4">
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-gray-300 p-4 rounded-md flex-1 ">
                        <div className="flex flex-col gap-1 items-start">
                            <div className="rounded-full bg-gray-50">
                                <Image src={"/expense-green.png"} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Mobile */}
            <div className="z-20 flex flex-col  gap-4 p-4 w-full h-full overflow-scroll">
                <div className="h-52 flex gap-4">
                    <DashboardCard title="TOTAL PROFITS" src="/income-green.png" value={formatUSDtoBRL(currentProfits)} description="" />
                    <DashboardCard
                        title="TOTAL EXPENSES"
                        src="/expense-green.png"
                        value={formatUSDtoBRL(currentExpense)}
                        description=""
                        variant
                    />
                </div>
                <div className="h-52 flex gap-4">
                    <DashboardCard
                        title="BALANCE"
                        src="/money-bag-filled-green.png"
                        value={formatUSDtoBRL(currentProfits - currentExpense)}
                        description=""
                    />
                    <DashboardCard
                        title="MOST SPENDING"
                        src="/coins-green.png"
                        value={categoryMaxOcc.element?.toUpperCase() as string}
                        description={formatUSDtoBRL(totalCategoryAmount)}
                    />
                </div>
                <div className=" flex-2 flex flex-col p-4 border-[1px] border-gray-300 bg-white rounded-md gap-4 ">
                    <p className={`font-extrabold text-xl  `}>Recent Expenses</p>
                    <div className="flex justify-between gap-4">
                        <div className="pb-10">
                            <div className="relative h-full w-1 bg-gray-100">
                                <div className="absolute bottom-0 h-[90%] w-full bg-green-400"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            {transactionItems
                                .filter(({type}) => type === "expense")
                                .slice(-transactionItems.filter(({type}) => type === "expense").length, 4)
                                .map(({amount, name, transactionDate}, key) => (
                                    <div key={key} className="relative  flex bg-gray-100 py-4 px-2 gap-2 rounded">
                                        <div className="absolute top-1/2 translate-y-[-50%] left-[-8.4%] bg-green-400 rounded-full w-4 h-4"></div>
                                        <div className="flex flex-col w-full flex-1">
                                            <h1 className="text-lg text-gray-800 font-semibold break-words max-w-36">{name}</h1>
                                            <p className="text-xs text-gray-700 dark:text-gray-300">
                                                {formatTime(transactionDate as string)}
                                            </p>
                                        </div>
                                        <p className={`text-base  font-bold truncate  cursor-pointer`}>{formatShortBRL(amount)}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
