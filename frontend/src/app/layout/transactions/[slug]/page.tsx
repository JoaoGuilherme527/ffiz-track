/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {getData, getTransactions} from "@/src/data/actions/auth-actions"
import {TransactionItem} from "@/src/types/types"
import TransactionScreen from "../../_screens/TransactionScreen"

async function fetchTransactions() {
    const transactions: TransactionItem[] = await getTransactions("")
    const expenses: TransactionItem[] = await getTransactions("expense")
    const profits: TransactionItem[] = await getTransactions("profit")
    const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
    const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
    return {transactions, sumExpenses, sumProfits}
}

export default async function Page({params}: {params: Promise<any>}) {
    const slug = (await params).slug
    const {transactions, sumExpenses, sumProfits} = await fetchTransactions()
    return <TransactionScreen params={{type: slug, sumExpenses, sumProfits, transactions}} />
}
