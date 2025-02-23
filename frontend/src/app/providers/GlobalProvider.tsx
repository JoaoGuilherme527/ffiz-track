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
    categoryMaxOcc: {element: string | null; occurred: number}
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
    const [categoryMaxOcc, setCategoryMaxOcc] = useState<{element: string | null; occurred: number}>({element: "Other", occurred: 0})
    const [totalCategoryAmount, setTotalCategoryAmount] = useState(0)

    async function fetchTransactions() {
        const expenses: TransactionItem[] = await getExpenses()
        const profits: TransactionItem[] = await getProfits()
        const transactions: TransactionItem[] = Array.prototype.concat(expenses, profits)

        const arr = expenses.map(({category}) => category)
        let maxOcc: {element: string | null; occurred: number} = {element: null, occurred: 0}

        const mostOcc = arr.reduce((acc: {[key: string]: number}, el) => {
            if (el !== undefined) {
                acc[el] = acc[el] ? acc[el] + 1 : 1
            }
            if (el !== undefined && acc[el] > maxOcc.occurred) {
                maxOcc = {element: el, occurred: acc[el]}
            }
            return acc
        }, {})

        const amountMostOcc = expenses
            .filter(({category}) => category === maxOcc.element)
            .map(({amount}) => amount)
            .reduce((acc, crr) => acc + crr)

        setCategoryMaxOcc(maxOcc)
        setTotalCategoryAmount(amountMostOcc)

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
                categoryMaxOcc,
                totalCategoryAmount,
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
