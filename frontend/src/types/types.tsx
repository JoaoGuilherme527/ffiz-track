export interface TransactionItem {
    name: string
    amount: number
    type: "expense" | "profit" | string
    createdAt?: string
    category?: string
    transactionDate: string
    id?: string
}

export interface CardItem {
    name: string
    limit: number
    available: number
    color: string
    id?: string
    isPaymentDay?: boolean
    expirationDate: string
}
