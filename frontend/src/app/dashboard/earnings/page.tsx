/* eslint-disable @typescript-eslint/no-unused-vars */
// import Navbar from "@/src/components/custom/Navbar";

"use client"

import TransactionItemComponent from "@/src/app/dashboard/components/TransactionItem"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {useState, useTransition} from "react"
import {TransactionItem} from "@/src/types/types"
import {deleteTransaction} from "@/src/data/actions/auth-actions"
import Loading from "../../loading"
import TotalAmountLabelComponent from "@/src/app/dashboard/components/TotalAmountLabel"
import AddTransactionButton from "../components/AddTransactionButton"

export default function EarningsRoute() {
    const {fetchTransactions, transactionItems, currentEarnings} = useGlobalContext()
    const [isEditExpenseOpen, setIsEditExpenseOpen] = useState<{status: boolean; data: TransactionItem | null}>({status: false, data: null})
    const [isEditModalExpenseOpen, setIsEditModalExpenseOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [pending, startTransition] = useTransition()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            {pending ? <Loading /> : <></>}
            <TotalAmountLabelComponent amount={currentEarnings} />

            <div className="z-20 w-full h-[65%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                {transactionItems
                    .filter(({type}) => type === "earning")
                    .map((item, key) => (
                        <TransactionItemComponent
                            key={key}
                            SVGIMG_EDIT={"/edit.svg"}
                            SVGIMG_PLUS={"/plus.svg"}
                            deleteExpense={() => {
                                setIsEditExpenseOpen({status: false, data: null})
                                startTransition(() => {
                                    deleteTransaction(item.id as string).then(() => fetchTransactions())
                                })
                            }}
                            item={item}
                            isEditExpenseOpen={isEditExpenseOpen}
                            setIsEditExpenseOpen={setIsEditExpenseOpen}
                            setIsEditModalExpenseOpen={setIsEditModalExpenseOpen}
                        />
                    ))}
            </div>

            <AddTransactionButton isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}
