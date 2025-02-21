
export interface TransactionItem {
  name: string;
  amount: number;
  type: "expense" | "profit"
  createdAt?: string
  category?: string
  transactionDate: string
  id?: string
}
