"use client"

import Image from "next/image"
import {memo, useState, useTransition} from "react"
import {addTransactionItem, deleteTransaction, updateTransactionItem} from "@/src/data/actions/auth-actions"
import {Input} from "@/src/components/ui/input"
import {useGlobalContext} from "../../providers/GlobalProvider"
import {TransactionItem} from "@/src/types/types"
import {formatUSDtoBRL} from "@/src/lib/utils"
import TransactionItemComponent from "@/src/app/dashboard/components/TransactionItem"
import TotalAmountLabelComponent from "@/src/app/dashboard/components/TotalAmountLabel"
import Loading from "../../loading"
import AddTransactionButton from "@/src/app/dashboard/components/AddTransactionButton"
import FormModalAddTransactionComponent from "@/src/app/dashboard/components/FormModalAddTransaction"

function ExpenseRoute() {
    const {currentExpense, fetchTransactions, setTransactionItems, transactionItems} = useGlobalContext()
    const [isEditExpenseOpen, setIsEditExpenseOpen] = useState<{status: boolean; data: TransactionItem | null}>({status: false, data: null})
    const [isEditModalExpenseOpen, setIsEditModalExpenseOpen] = useState<{status: boolean; data: TransactionItem | null}>({
        status: false,
        data: null,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pending, startTransition] = useTransition()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            {pending ? <Loading /> : <></>}
            <TotalAmountLabelComponent amount={currentExpense} />
            <div className="z-20 w-full h-[65%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-40 ">
                {transactionItems
                    .filter(({type}) => type === "expense")
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

            <FormModalAddTransactionComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmit={(e) => {
                    startTransition(() => {
                        const formData = new FormData(e.target as HTMLFormElement)
                        addTransactionItem(formData).then((response) => {
                            setTransactionItems([...transactionItems, response])
                        })
                        e.currentTarget.reset()
                    })
                }}
            />

            <div
                className={`transition-all w-dvw h-dvh  z-30 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-[0]  ${
                    isEditModalExpenseOpen.status ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
                }`}
            >
                <form
                    method="post"
                    className={`relative transition-all flex flex-col gap-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
                        isEditModalExpenseOpen.status ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
                    } `}
                    onSubmit={(e) => {
                        e.preventDefault()
                        setIsEditModalExpenseOpen({data: null, status: false})
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            updateTransactionItem(formData, isEditModalExpenseOpen.data?.id ?? "")
                                .then((response) => {
                                    if (typeof response !== "string") {
                                        const {id} = response
                                        const expensesFilter = transactionItems.filter((item) => id != item.id)
                                        setTransactionItems(expensesFilter)
                                    }
                                })
                                .then(() => {
                                    fetchTransactions()
                                })
                            e.currentTarget.reset()
                        })
                    }}
                >
                    <div className="flex flex-col gap-5">
                        <label className="text-sm text-gray-700 flex place-items-baseline justify-between">
                            Current amount: {formatUSDtoBRL(isEditModalExpenseOpen.data?.amount as number)}
                            <div
                                className="w-8 h-8 p-1 bg-red-400 rounded flex items-center justify-center"
                                onClick={() => setIsEditModalExpenseOpen({data: null, status: false})}
                            >
                                <Image alt="delete button" src={"/plus.svg"} className={"rotate-45"} width={20} height={20} />
                            </div>
                        </label>
                        <Input
                            required
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder={formatUSDtoBRL(isEditModalExpenseOpen.data?.amount as number)}
                            step={"0.01"}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="text-sm text-white py-2 px-10 rounded font-bold bg-[var(--dark-green)]">
                            Update Expense
                        </button>
                    </div>
                </form>
            </div>

            <AddTransactionButton isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default memo(ExpenseRoute)
