import {FormEvent, useEffect, useState} from "react"
import {Input} from "../../../components/ui/input"

interface FormModalAddTransactionProps {
    isModalOpen: boolean
    setIsModalOpen: (param: boolean) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    type: string
}

export default function FormModalAddTransactionComponent({isModalOpen, onSubmit, setIsModalOpen, type}: FormModalAddTransactionProps) {
    const [date, setDate] = useState("")

    useEffect(() => {
        const date = new Date().toLocaleString("sv-SE", {timeZoneName: "short"}).replace(" ", "T").slice(0, 16)
        setDate(date)

        return () => {}
    }, [isModalOpen])

    return (
        <div
            className={`transition-all w-dvw h-dvh  z-30 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center top-0  ${
                isModalOpen ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
            }`}
        >
            <form
                method="post"
                className={`transition-all flex flex-col space-y-3 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-1 pb-5 ${
                    isModalOpen ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
                } `}
                onSubmit={(e) => {
                    e.preventDefault()
                    setIsModalOpen(false)
                    onSubmit(e)
                }}
            >
                <div className="">
                    <label htmlFor="name" className="text-sm text-gray-700">
                        Name of your {type}:
                    </label>
                    <Input required id="name" name="name" type="text" placeholder={`${type} name`} />
                </div>
                <div className="">
                    <label htmlFor="amount" className="text-sm text-gray-700">
                        Amount of your {type}:
                    </label>
                    <Input required id="amount" name="amount" type="number" placeholder="amount" step={"0.01"} />
                    <Input readOnly className="opacity-0 hidden" value={type} id="type" name="type" type="text" placeholder="type" />
                </div>
                <div className="">
                    <label htmlFor="category" className="text-sm text-gray-700">
                        Category of your {type}:
                    </label>
                    <select
                        required
                        name="category"
                        id="category"
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

                <div className="">
                    <label htmlFor="transactionDate" className="text-sm text-gray-700">
                        Date of your {type}:
                    </label>
                    <Input id="transactionDate" name="transactionDate" type="datetime-local" defaultValue={date} />
                </div>
                <div className="w-full flex justify-center">
                    <button type="submit" className="text-sm text-white py-2 px-10 rounded font-bold bg-[var(--dark-green)]">
                        Add Expense
                    </button>
                </div>
            </form>
        </div>
    )
}
