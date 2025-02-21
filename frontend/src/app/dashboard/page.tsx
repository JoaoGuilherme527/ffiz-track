/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {formatShortBRL} from "@/src/lib/utils"
import {useGlobalContext} from "../providers/GlobalProvider"

export default function DashboardRoute() {
    const {currentExpense, currentProfits} = useGlobalContext()

    return (
        <div className="z-20 flex flex-col gap-2 py-2 px-2 w-full h-full ">
            <div className="relative h-20 rounded-md bg-[var(--darkest-green)] py-2 px-6 flex items-center justify-end text-gray-100 shadow-lg">
                <h1 className="absolute top-2 left-2 text-white font-extralight  text-lg">Balance</h1>
                <p className="font-semibold text-4xl">{formatShortBRL(currentProfits - currentExpense)}</p>
            </div>

            <div className="flex gap-2 h-36">
                <div className=" relative p-4 rounded-md bg-[var(--darkest-green)]  flex items-end justify-end flex-1 text-green-600 shadow-lg">
                    <h1 className="absolute top-2 left-2 text-white font-extralight  text-lg">Expenses</h1>
                    <p className="font-semibold text-xl">{formatShortBRL(currentExpense)}</p>
                </div>
                <div className="relative p-4 rounded-md bg-[var(--darkest-green)]  flex items-end justify-end flex-1 text-red-400 shadow-lg">
                    <h1 className="absolute top-2 left-2 text-white font-extralight  text-lg">Profits</h1>
                    <p className="font-semibold text-xl">- {formatShortBRL(currentProfits)}</p>
                </div>
            </div>
        </div>
    )
}
