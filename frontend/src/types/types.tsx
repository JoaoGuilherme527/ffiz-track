export interface TransactionItem {
    name: string
    amount: number
    type: "expense" | "profit" | string
    createdAt?: string
    category?: string
    transactionDate: string
    frequency: "variable" | "fixed"
    id?: string
}

export interface CardItem {
    name: string
    limit: number
    available: number
    color: string
    expirationDate: string
    isPaid?: boolean
    id?: string
}
