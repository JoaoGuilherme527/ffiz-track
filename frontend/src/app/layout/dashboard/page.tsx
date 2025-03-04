/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {getCardItems, getData, getTransactions} from "@/src/data/actions/auth-actions"
import {CardItem, TransactionItem} from "@/src/types/types"
import DashboardScreen from "../_screens/DashboardScreen"

async function fetchTransactions() {
    const expenses: TransactionItem[] = await getTransactions("expense")
    const profits: TransactionItem[] = await getTransactions("profit")
    const transactions: TransactionItem[] = await getTransactions("")
    const {cards} = await getCardItems()
    const data = await getData()
    const balance = data?.balance ?? 0
    const mostFrequentCategory = data?.mostFrequentCategory ?? {category: "", amount: 0}
    const highestSpendingCategory = data?.highestSpendingCategory ?? {category: "", amount: 0}
    const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
    const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)

    return {sumExpenses, sumProfits, expenses, transactions, profits, balance, mostFrequentCategory, highestSpendingCategory, cards}
}

export default async function Page() {
    const {sumExpenses, sumProfits, expenses, transactions, profits, balance, mostFrequentCategory, highestSpendingCategory, cards} =
        await fetchTransactions()
    return (
        <DashboardScreen
            params={{
                sumExpenses,
                sumProfits,
                expenses,
                transactions,
                profits,
                balance,
                mostFrequentCategory,
                highestSpendingCategory,
                cards,
            }}
        />
    )
}
