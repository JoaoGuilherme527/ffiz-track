"use client"

import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    currentExpense: number
    setCurrentExpense: (param: number) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    return <GlobalContext.Provider value={{currentExpense, setCurrentExpense}}>{children}</GlobalContext.Provider>
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}
