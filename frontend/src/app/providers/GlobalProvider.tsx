/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {getData, getTransactions} from "@/src/data/actions/auth-actions"
import { getItem } from "@/src/lib/utils"
import {TransactionItem} from "@/src/types/types"
import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    isTheme: string
    setIsTheme: (param: string) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)


export function GlobalProvider({children}: {children: ReactNode}) {
    const [isTheme, setIsTheme] = useState<string>(getItem("theme")||"dark")

    return <GlobalContext.Provider value={{isTheme, setIsTheme}}>{children}</GlobalContext.Provider>
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}
