"use client"

import {getProfits, getExpenses} from "@/src/data/actions/auth-actions"
import {TransactionItem} from "@/src/types/types"
import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    currentExpense: number
    setCurrentExpense: (param: number) => void
    currentProfits: number
    setCurrentProfits: (param: number) => void
    transactionItems: TransactionItem[]
    setTransactionItems: (param: TransactionItem[]) => void
    fetchTransactions: () => Promise<{
        sumExpenses: number
        sumProfits: number
        expenses: TransactionItem[]
        transactions: TransactionItem[]
        profits: TransactionItem[]
    }>
    isMobile: boolean
    setIsMobile: (param: boolean) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    const [currentProfits, setCurrentProfits] = useState<number>(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([])

    async function fetchTransactions() {
        const expenses: TransactionItem[] = await getExpenses()
        const profits: TransactionItem[] = await getProfits()
        const transactions: TransactionItem[] = Array.prototype.concat(expenses, profits)

        setTransactionItems(transactions)
        const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)

        const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        setCurrentExpense(sumExpenses)
        setCurrentProfits(sumProfits)

        return {sumExpenses, sumProfits, expenses, transactions, profits}
    }

    return (
        <GlobalContext.Provider
            value={{
                currentProfits,
                setCurrentProfits,
                currentExpense,
                setCurrentExpense,
                transactionItems,
                setTransactionItems,
                fetchTransactions,
                isMobile,
                setIsMobile,
            }}
        >
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
