/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {useGlobalContext} from "../providers/GlobalProvider"

export default function DashboardRoute() {
    const {currentExpense} = useGlobalContext()

    return <div>{currentExpense}</div>
}
