
export interface TransactionItem {
  name: string;
  amount: number;
  type: "expense" | "earning"
  createdAt?: string
  category?: string
  transactionDate: string
  id?: string
}
