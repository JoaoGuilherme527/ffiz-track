"use client"

import Image from "next/image"
import {useEffect, useLayoutEffect, useState, useTransition} from "react"
import SVGIMG_PLUS from "../../../public/plus.svg"
import SVGIMG_EDIT from "../../../public/edit.svg"
import {addExpenseItem, deleteExpense, getExpenses, updateExpenseItem} from "@/src/data/actions/auth-actions"
import {Input} from "@/src/components/ui/input"
import ExpenseItemComponent from "@/src/components/custom/ExpenseItem"

interface ExpenseItem {
    name: string
    amount: number
    createdAt: string
    id: string
    userId: string
}

export default function ExpenseRoute() {
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
    const [isEditExpenseOpen, setIsEditExpenseOpen] = useState<{status: boolean; data: ExpenseItem | null}>({status: false, data: null})
    const [isEditModalExpenseOpen, setIsEditModalExpenseOpen] = useState<{status: boolean; data: ExpenseItem | null}>({
        status: false,
        data: null,
    })
    const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([])
    const [pending, startTransition] = useTransition()
    const [totalExpensesAmount, setTotalExpensesAmount] = useState("")
    const [fontSize, setFontSize] = useState("text-5xl")

    const formatUSDtoBRL = (number: number): string => {
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(number)

        return formattedValue
    }

    async function fetchExpenses() {
        const response: ExpenseItem[] = await getExpenses()
        if (response) {
            setExpenseItems(response)
        } else setExpenseItems([])
    }

    useEffect(
        function sumExpenses() {
            const sum = expenseItems.map(({amount}) => amount).reduce((acc, crr) => acc + crr, 0)
            const formattedValue = formatUSDtoBRL(sum)
            const length = formattedValue.length

            setTotalExpensesAmount(formattedValue)

            if (length <= 10) {
                setFontSize("text-5xl")
            } else if (length <= 14) {
                setFontSize("text-4xl")
            } else if (length <= 18) {
                setFontSize("text-3xl")
            } else {
                setFontSize("text-2xl")
            }
        },
        [expenseItems]
    )

    useLayoutEffect(() => {
        startTransition(() => {
            fetchExpenses()
        })
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--light-green)] dark:bg-gray-900 overflow-hidden">
            <div className="z-40 absolute top-0 w-full h-[6%] bg-[var(--dark-green)] shadow-md"></div>
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
            <div className="transition-all z-20 w-full h-[35%] absolute top-0 left-0 flex items-center justify-center px-10">
                <div className="transition-all border-2 rounded border-[var(--light-green)] w-full px-5 py-5">
                    <h1 className={`transition-all drop-shadow-lg text-[var(--light-green)] font-bold text-center ${fontSize}`}>
                        {totalExpensesAmount}
                    </h1>
                </div>
            </div>
            <div className="z-20 w-full h-[65%] px-10 flex flex-col space-y-5 overflow-x-auto absolute bottom-0 transition-all pb-20 ">
                {expenseItems.map((item, key) => (
                    <ExpenseItemComponent
                        key={key}
                        SVGIMG_EDIT={SVGIMG_EDIT}
                        SVGIMG_PLUS={SVGIMG_PLUS}
                        deleteExpense={() => {
                            setIsEditExpenseOpen({status: false, data: null})
                            startTransition(() => {
                                deleteExpense(item.id).then(() => fetchExpenses())
                            })
                        }}
                        item={item}
                        isEditExpenseOpen={isEditExpenseOpen}
                        setIsEditExpenseOpen={setIsEditExpenseOpen}
                        setIsEditModalExpenseOpen={setIsEditModalExpenseOpen}
                    />
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
                    className={`relative transition-all flex flex-col gap-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
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
                            Current amount: {formatUSDtoBRL(isEditModalExpenseOpen.data?.amount as number)}
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
        </div>
    )
}
