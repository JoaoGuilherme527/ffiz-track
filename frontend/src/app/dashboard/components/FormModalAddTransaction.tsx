import {FormEvent} from "react"
import { Input } from "../../../components/ui/input"

interface FormModalAddTransactionProps {
    isModalOpen: boolean
    setIsModalOpen: (param: boolean) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function FormModalAddTransactionComponent({isModalOpen,onSubmit,setIsModalOpen}: FormModalAddTransactionProps) {
    return (
        <div
            className={`transition-all w-dvw h-dvh  z-30 absolute  left-[50%] translate-x-[-50%] flex items-center justify-center bottom-[0]  ${
                isModalOpen ? "bg-[#0003] " : "bg-[#0000] pointer-events-none"
            }`}
        >
            <form
                method="post"
                className={`transition-all flex flex-col space-y-5 w-[90%] rounded-md shadow-2xl bg-white px-10 pt-2 pb-5 ${
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
    )
}
