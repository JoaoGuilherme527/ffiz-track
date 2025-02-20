"use client"

import {getExpenses} from "@/src/data/actions/auth-actions"
import {ExpenseItem} from "@/src/types/types"
import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    currentExpense: number
    setCurrentExpense: (param: number) => void
    expenseItems: ExpenseItem[]
    setExpenseItems: (param: ExpenseItem[]) => void
    fetchExpenses: () => Promise<void>
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([])

    async function fetchExpenses() {
        const response: ExpenseItem[] = await getExpenses()
        if (response) {
            setExpenseItems(response)
            const sum = response.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
            setCurrentExpense(sum)
        } else setExpenseItems([])
    }

    return (
        <GlobalContext.Provider value={{currentExpense, setCurrentExpense, expenseItems, setExpenseItems, fetchExpenses}}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}
