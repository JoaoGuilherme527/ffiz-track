/* eslint-disable @typescript-eslint/no-explicit-any */

import WalletScreen from "../_screens/WalletScreen"

async function fetchTransactions() {
    return {value: 1}
}

export default async function Page({params}: {params: Promise<any>}) {
    const slug = (await params).slug
    const {value} = await fetchTransactions()
    return <WalletScreen />
}
