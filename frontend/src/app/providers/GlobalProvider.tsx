/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {getData, getTransactions} from "@/src/data/actions/auth-actions"
import {TransactionItem} from "@/src/types/types"
import {createContext, useContext, useState, ReactNode} from "react"

interface GlobalContextProps {
    currentExpense: number
    setCurrentExpense: (param: number) => void
    currentProfits: number
    setCurrentProfits: (param: number) => void
    transactionItems: TransactionItem[]
    setTransactionItems: (param: TransactionItem[]) => void
    // fetchTransactions: () => Promise<{
    //     sumExpenses: number
    //     sumProfits: number
    //     expenses: TransactionItem[]
    //     transactions: TransactionItem[]
    //     profits: TransactionItem[]
    // }>
    fetchTransactions: () => Promise<void>
    categoryMaxOcc: string
    categoryMostOcc: string
    totalTimesCategoryApp: number
    totalCategoryAmount: number
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    const [currentProfits, setCurrentProfits] = useState<number>(0)
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([])
    const [categoryMaxOcc, setCategoryMaxOcc] = useState<string>("-")
    const [categoryMostOcc, setCategoryMostOcc] = useState<string>("-")
    const [totalCategoryAmount, setTotalCategoryAmount] = useState(0)
    const [totalTimesCategoryApp, setTotalTimesCategoryApp] = useState(0)

    async function fetchTransactions() {
        // const expenses: TransactionItem[] = await getTransactions("expense")
        // const profits: TransactionItem[] = await getTransactions("profit")
        // const transactions: TransactionItem[] = await getTransactions("")
        // const {balance, mostFrequentCategory, highestSpendingCategory} = await getData()
        // const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        // const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        // return {sumExpenses, sumProfits, expenses, transactions, profits, balance, mostFrequentCategory, highestSpendingCategory}
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
                categoryMaxOcc,
                totalCategoryAmount,
                categoryMostOcc,
                totalTimesCategoryApp,
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
