/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from "next/image"
import {startTransition, useActionState, useEffect, useLayoutEffect, useState, useTransition} from "react"
import SVGIMG_PLUS from "../../../public/plus.svg"
import SVGIMG_EDIT from "../../../public/edit.svg"
import {addExpenseItem, checkUserLogged, deleteExpense, getExpenses, updateExpenseItem} from "@/src/data/actions/auth-actions"
import {Input} from "@/src/components/ui/input"
import {formatTime} from "@/src/lib/utils"

interface ExpenseItem {
    name: string
    amount: number
    createdAt: string
    id: string
    userId: string
}

export default function DashboardRoute() {
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
    const [isEditExpenseOpen, setIsEditExpenseOpen] = useState<{status: boolean; data: ExpenseItem | null}>({status: false, data: null})
    const [isEditModalExpenseOpen, setIsEditModalExpenseOpen] = useState<{status: boolean; data: ExpenseItem | null}>({
        status: false,
        data: null,
    })
    const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([])
    const [pending, startTransition] = useTransition()
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(0)

    const formatUSDtoBRL = (number: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(number)
    }

    function handleExpensesSum(items: ExpenseItem[]) {}

    async function fetchExpenses() {
        const response: ExpenseItem[] = await getExpenses()
        if (response) {
            setExpenseItems(response)
            const sum = response.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
            setTotalExpensesAmount(sum)
        } else setExpenseItems([])
    }

    useLayoutEffect(() => {
        startTransition(() => {
            fetchExpenses()
        })
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            {pending ? (
                <div className="z-50 absolute top-0 right-0 w-dvw h-dvh bg-[#0002] flex items-center justify-center">
                    <div className="w-20 h-20 animate-ping bg-white rounded-full"></div>
                </div>
            ) : (
                <></>
            )}
            <div className="w-full h-[30%] absolute top-0 left-0 bg-red-500 z-10">
                <div className="relative w-full h-full bg-[var(--green)]"></div>
                <div className="container">
                    <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                        <path d="M0,100 C150,140 300,60 500,100 L500,00 L0,0 Z" style={{stroke: "none", fill: "var(--green)"}}></path>
                    </svg>
                </div>
            </div>
            <div
                className="z-40 absolute bottom-5 left-[50%] translate-x-[-50%] rounded-full bg-[var(--green)] shadow-lg w-20 h-20 justify-center items-center flex text-white active:scale-[0.7] transition-all"
                onClick={() => setIsAddExpenseModalOpen(!isAddExpenseModalOpen)}
            >
                <Image alt="add button" src={SVGIMG_PLUS} className={`${isAddExpenseModalOpen ? "rotate-45" : "rotate-0"}`} />
            </div>
            <div className="z-20 w-full h-[40%] absolute top-0 left-0 flex items-center justify-center px-10">
                <div className="border-4 rounded border-[var(--light-green)] w-full px-5 py-5">
                    <h1 className="text-[var(--light-green)] font-bold text-5xl text-center">{formatUSDtoBRL(totalExpensesAmount)}</h1>
                </div>
            </div>
            <div className="z-20 w-full h-[60%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-20 ">
                {expenseItems?.map((item, index) => (
                    <div className="w-full relative flex items-center active:scale-y-[0.9] transition-all" key={index}>
                        <div
                            className={`transition-all flex items-center gap-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-xl p-5 z-20 ${
                                isEditExpenseOpen.data?.id === item.id ? "translate-x-[-24%] w-[80%] rounded-r-none" : ""
                            } `}
                            onClick={() => {
                                if (isEditExpenseOpen.data?.id === item.id) {
                                    setIsEditExpenseOpen({status: false, data: null})
                                    return
                                } else setIsEditExpenseOpen({status: true, data: item})
                            }}
                        >
                            <div className="flex flex-col w-full flex-1">
                                <h1 className="text-lg text-gray-800 font-semibold">{item.name}</h1>
                                <p className="text-xs text-gray-700 dark:text-gray-300">{formatTime(item.createdAt)}</p>
                            </div>
                            <p className="text-2xl text-red-300 font-bold">{formatUSDtoBRL(item.amount)}</p>
                        </div>
                        <div
                            className={`absolute right-0 bg-red-400 w-[12%] h-full rounded-r-md flex items-center justify-center z-10 active:bg-red-600`}
                            onClick={() => {
                                setIsEditExpenseOpen({status: false, data: null})
                                startTransition(() => {
                                    deleteExpense(item.id).then(() => fetchExpenses())
                                })
                            }}
                        >
                            <Image alt="delete button" src={SVGIMG_PLUS} className={"rotate-45"} />
                        </div>
                        <div
                            className={`absolute right-[12%] bg-blue-400 w-[12%] h-full flex items-center justify-center z-10 active:bg-blue-600`}
                            onClick={() => {
                                setIsEditExpenseOpen({status: false, data: null})
                                setIsEditModalExpenseOpen({status: true, data: item})
                            }}
                        >
                            <Image alt="edit button" src={SVGIMG_EDIT} />
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={`transition-all w-dvw h-dvh  z-30 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-[0]  ${
                    isAddExpenseModalOpen ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
                }`}
            >
                <form
                    method="post"
                    className={`transition-all flex flex-col space-y-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
                        isAddExpenseModalOpen ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
                    } `}
                    onSubmit={(e) => {
                        e.preventDefault()
                        setIsAddExpenseModalOpen(false)
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            addExpenseItem(formData).then((response) => {
                                setExpenseItems([...expenseItems, response])
                            })
                            e.currentTarget.reset()
                        })
                    }}
                >
                    <div className="">
                        <label htmlFor="name" className="text-sm text-gray-700">
                            Name of your expense:
                        </label>
                        <Input required id="name" name="name" type="text" placeholder="expense name" />
                    </div>
                    <div className="">
                        <label htmlFor="amount" className="text-sm text-gray-700">
                            Amount of your expense:
                        </label>
                        <Input required id="amount" name="amount" type="number" placeholder="amount" step={"0.01"} />
                    </div>
                    <div className="">
                        <label htmlFor="type" className="text-sm text-gray-700">
                            Type of your expense:
                        </label>
                        <select
                            required
                            name="type"
                            id="type"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        >
                            <option value="Utilities">Utilities</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Housing">Housing</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Student loans">Student loans</option>
                            <option value="Cellphone">Cellphone</option>
                            <option value="Car payment">Car payment</option>
                            <option value="Personal care">Personal care</option>
                            <option value="Health care">Health care</option>
                            <option value="Debt">Debt</option>
                            <option value="Rent">Rent</option>
                            <option value="Memberships">Memberships</option>
                            <option value="Emergency fund">Emergency fund</option>
                            <option value="Concerts">Concerts</option>
                            <option value="Food">Food</option>
                            <option value="Registration">Registration</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Savings">Savings</option>
                            <option value="Parking">Parking</option>
                            <option value="Gas">Gas</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="text-sm text-white py-2 px-10 rounded font-bold bg-[var(--dark-green)]">
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
            <div
                className={`transition-all w-dvw h-dvh  z-30 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-[0]  ${
                    isEditModalExpenseOpen.status ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
                }`}
            >
                <form
                    method="post"
                    className={`transition-all flex flex-col gap-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
                        isEditModalExpenseOpen.status ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
                    } `}
                    onSubmit={(e) => {
                        e.preventDefault()
                        setIsEditModalExpenseOpen({data: null, status: false})
                        startTransition(() => {
                            const formData = new FormData(e.target as HTMLFormElement)
                            updateExpenseItem(formData, isEditModalExpenseOpen.data?.id ?? "")
                                .then((response) => {
                                    if (typeof response !== "string") {
                                        const {id} = response
                                        const expensesFilter = expenseItems.filter((item) => id != item.id)
                                        setExpenseItems(expensesFilter)
                                    }
                                })
                                .then(() => {
                                    fetchExpenses()
                                })
                            e.currentTarget.reset()
                        })
                    }}
                >
                    <div
                        className="absolute top-[-5] right-[-5] p-1 bg-red-400 rounded"
                        onClick={() => setIsEditModalExpenseOpen({data: null, status: false})}
                    >
                        <Image alt="delete button" src={SVGIMG_PLUS} className={"rotate-45"} />
                    </div>

                    <div className="">
                        <label htmlFor="amount" className="text-sm text-gray-700">
                            Update amount of your expense: {formatUSDtoBRL(isEditModalExpenseOpen.data?.amount as number)}
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
            <div className="absolute bottom-0 w-full h-20 bg-[var(--green)]"></div>
        </div>
    )
}
