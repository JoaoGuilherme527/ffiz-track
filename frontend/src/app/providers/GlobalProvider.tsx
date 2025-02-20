"use client"

import {getEarnings, getExpenses} from "@/src/data/actions/auth-actions"
import {TransactionItem} from "@/src/types/types"
import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    currentExpense: number
    setCurrentExpense: (param: number) => void
    transactionItems: TransactionItem[]
    setTransactionItems: (param: TransactionItem[]) => void
    fetchTransactions: () => Promise<void>
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([])

    async function fetchTransactions() {
        const expenses: TransactionItem[] = await getExpenses()
        const earnings: TransactionItem[] = await getEarnings()
        const transitions: TransactionItem[] = Array.prototype.concat(expenses, earnings)

        if (transitions) {
            setTransactionItems(transitions)
            const sumExpenses = transitions
                .filter(({type}) => type === "expense")
                .map(({amount}) => amount)
                .reduce((acc, crr) => acc + crr, 0)
            setCurrentExpense(sumExpenses)
        } else setTransactionItems([])
    }

    return (
        <GlobalContext.Provider value={{currentExpense, setCurrentExpense, transactionItems, setTransactionItems, fetchTransactions}}>
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
