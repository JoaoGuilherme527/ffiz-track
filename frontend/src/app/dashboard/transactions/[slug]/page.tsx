/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionScreen from "../../_screens/TransactionScreen"
import {getTransactions} from "@/src/data/actions/auth-actions"
import {TransactionItem} from "@/src/types/types"

async function fetchTransactions() {
    const expenses: TransactionItem[] = await getTransactions("expense")
    const profits: TransactionItem[] = await getTransactions("profit")
    const transactions: TransactionItem[] = await getTransactions("")
    const sumExpenses = expenses.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
    const sumProfits = profits.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)

    return {sumExpenses, sumProfits, transactions}
}

export default async function Page({params}: {params: Promise<any>}) {
    const slug = (await params).slug
    const {sumExpenses, sumProfits, transactions} = await fetchTransactions()
    return <TransactionScreen params={{type: slug, sumExpenses, sumProfits, transactions}} />
}
