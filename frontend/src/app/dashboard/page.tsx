/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {useGlobalContext} from "../providers/GlobalProvider"

export default function DashboardRoute() {
    const {currentExpense} = useGlobalContext()

    return (
        <div className="grid-flow-col-dense gap-10 ">
            <div
                className="rounded-md bg-white font-bold flex items-center justify-center flex-1"
            >{currentExpense}</div>
            <div
                className="rounded-md bg-white font-bold flex items-center justify-center flex-1"
            >{currentExpense}</div>
            <div
                className="rounded-md bg-white font-bold flex items-center justify-center flex-1"
            >{currentExpense}</div>
            <div
                className="rounded-md bg-white font-bold flex items-center justify-center flex-1"
            >{currentExpense}</div>
            <div
                className="rounded-md bg-white font-bold flex items-center justify-center flex-1"
            >{currentExpense}</div>
        </div>
    )
}
