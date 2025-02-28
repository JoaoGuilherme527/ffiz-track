/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {formatShortBRL, formatTime, formatUSDtoBRL} from "@/src/lib/utils"
import Image from "next/image"
import {StaticImport} from "next/dist/shared/lib/get-img-props"
import {Key} from "react"

interface DashboardCardProps {
    src: string | StaticImport
    title: string
    value: string
    description: string
    variant?: boolean
}

const DashboardCard = ({src, title, value, description, variant}: DashboardCardProps) => (
    <div
        onClick={() => {
            console.log("log")
        }}
        className={` relative p-4 border-[1px] border-gray-300  rounded-md flex flex-col  items-start justify-evenly flex-1 text-gray-700 shadow-sm gap-2 ${
            variant ? "bg-green-500" : "bg-white"
        }`}
    >
        <div className={`rounded-full   ${variant ? "bg-white" : "bg-gray-50"}`}>
            <Image src={src} alt="" width={50} height={50} className=" p-2 w-16 h-w-16" />
        </div>
        <h1 className={`font-bold text-sm   ${variant ? "text-gray-50" : "text-gray-400"}`}>{title}</h1>
        <p className={`font-extrabold text-base  ${variant ? "text-white" : ""}`}>{value}</p>
        <p className={`${variant ? "text-gray-50" : "text-gray-400"} text-xs font-normal`}>{description}</p>
    </div>
)

export default function DashboardScreen({params}: any) {
    const {sumExpenses, sumProfits, expenses, transactions, profits, balance, mostFrequentCategory, highestSpendingCategory} = params
    return (
        <>
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
            <div className="z-20 flex flex-col gap-4 p-4 w-full overflow-scroll md:hidden">
                <div className="h-52 flex gap-4">
                    <DashboardCard title="TOTAL PROFITS" src="/income-green.png" value={formatUSDtoBRL(sumProfits)} description="" />
                    <DashboardCard
                        title="BALANCE"
                        src="/money-bag-filled-green.png"
                        value={formatUSDtoBRL(balance)}
                        description=""
                        variant
                    />
                </div>
                <div className="h-52 flex gap-4">
                    <DashboardCard title="TOTAL EXPENSES" src="/expense-green.png" value={formatUSDtoBRL(sumExpenses)} description="" />
                    <DashboardCard
                        title="AVAILABLE CREDIT"
                        src="/credit-card-green.png"
                        // value={formatUSDtoBRL(41.82)}
                        // description={formatUSDtoBRL(1000)}
                        value={formatUSDtoBRL(0)}
                        description={formatUSDtoBRL(0)}
                    />
                </div>
                <div className="h-52 flex gap-4">
                    <DashboardCard
                        title="MOST FREQUENCY"
                        src="/coins-green.png"
                        value={mostFrequentCategory.category.toUpperCase() as string}
                        description={mostFrequentCategory.amount + " Times"}
                    />
                    <DashboardCard
                        title=" MOST SPENDING"
                        src="/coins-green.png"
                        value={highestSpendingCategory.category.toUpperCase() as string}
                        description={formatUSDtoBRL(highestSpendingCategory.amount)}
                        variant
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
                            {expenses
                                .slice(-expenses.length, 5)
                                .sort(
                                    (a: {transactionDate: string | number | Date}, b: {transactionDate: string | number | Date}) =>
                                        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
                                )
                                .map(({amount, name, transactionDate}: any, key: Key | null | undefined) => (
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
