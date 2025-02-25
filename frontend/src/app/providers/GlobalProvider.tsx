/* eslint-disable @typescript-eslint/no-unused-vars */
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
    categoryMaxOcc: string
    categoryMostOcc: string
    totalTimesCategoryApp: number
    totalCategoryAmount: number
    isMobile: boolean
    setIsMobile: (param: boolean) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export function GlobalProvider({children}: {children: ReactNode}) {
    const [currentExpense, setCurrentExpense] = useState<number>(0)
    const [currentProfits, setCurrentProfits] = useState<number>(0)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([])
    const [categoryMaxOcc, setCategoryMaxOcc] = useState<string>("-")
    const [categoryMostOcc, setCategoryMostOcc] = useState<string>("-")
    const [totalCategoryAmount, setTotalCategoryAmount] = useState(0)
    const [totalTimesCategoryApp, setTotalTimesCategoryApp] = useState(0)

    async function fetchTransactions() {
        const expenses: TransactionItem[] = await getExpenses()
        const profits: TransactionItem[] = await getProfits()
        const transactions: TransactionItem[] = Array.prototype.concat(expenses, profits)
        setTransactionItems(transactions)
        const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        setCurrentExpense(sumExpenses)
        const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
        setCurrentProfits(sumProfits)

        const categoryCount: {[key: string]: number} = {}
        const categorySum: {[key: string]: number} = {}

        expenses.forEach(({category, amount}) => {
            categoryCount[category as string] = (categoryCount[category as string] || 0) + 1
            categorySum[category as string] = (categorySum[category as string] || 0) + amount
        })

        const mostFrequentCategory = Object.entries(categoryCount).reduce((max, current) => (current[1] > max[1] ? current : max), [
            "",
            0,
        ] as [string, number])

        const highestSpendingCategory = Object.entries(categorySum).reduce((max, current) => (current[1] > max[1] ? current : max), [
            "",
            0,
        ] as [string, number])

        setCategoryMostOcc(mostFrequentCategory[0])
        setTotalTimesCategoryApp(mostFrequentCategory[1])
        setCategoryMaxOcc(highestSpendingCategory[0])
        setTotalCategoryAmount(highestSpendingCategory[1])


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
