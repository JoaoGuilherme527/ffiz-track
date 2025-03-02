/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCardItems, getTransactions} from "@/src/data/actions/auth-actions"
import WalletScreen from "../_screens/WalletScreen"

async function fetchTransactions() {
    const {cards} = await getCardItems()
    const transactions = await getTransactions("")
    return {cards, transactions}
}

export default async function Page() {
    const {cards, transactions} = await fetchTransactions()
    return <WalletScreen params={{cards, transactions}} />
}
