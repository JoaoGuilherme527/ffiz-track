import {FormEvent, useEffect, useState} from "react"
import FormModal from "@/src/components/forms/FormModal"
import {Input} from "@/src/components/ui/input"

interface FormModalAddTransactionProps {
    isModalOpen: boolean
    setIsModalOpen: (param: boolean) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onClose: () => void
    type: string
}

export default function FormModalAddTransactionComponent({
    isModalOpen,
    onSubmit,
    setIsModalOpen,
    onClose,
    type,
}: FormModalAddTransactionProps) {
    const [date, setDate] = useState("")

    useEffect(() => {
        // const date = new Date().toLocaleString("sv-SE", {timeZoneName: "short"}).replace(" ", "T").slice(0, 16)
        const date = new Date().toISOString().slice(0, 16)
        setDate(date)

        return () => {}
    }, [isModalOpen])

    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-gray-700">
                    Name of your {type}:
                </label>
                <Input required id="name" name="name" type="text" placeholder={`${type} name`} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-sm text-gray-700">
                    Amount:
                </label>
                <Input required id="amount" name="amount" type="number" placeholder="amount" step={"0.01"} />
                <Input
                    readOnly
                    className="opacity-0 hidden"
                    value={type.replace("transaction", "").trim()}
                    id="type"
                    name="type"
                    type="text"
                    placeholder="type"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="frequency" className="text-sm text-gray-700">
                    Frequency type:
                </label>
                <select
                    required
                    name="frequency"
                    id="frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                    <option value="variable">Variable</option>
                    <option value="fixed">Fixed</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-sm text-gray-700">
                    Category:
                </label>
                <select
                    required
                    name="category"
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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

            <div className="flex flex-col gap-2">
                <label htmlFor="transactionDate" className="text-sm text-gray-700">
                    Date of your {type}:
                </label>
                <Input id="transactionDate" name="transactionDate" type="datetime-local" defaultValue={date} />
            </div>
            <div className="w-full flex justify-center py-2">
                <div className="text-sm text-white py-2 px-10 rounded font-bold bg-green-700 cursor-pointer flex-1 text-center">
                    <button type="submit">Add Expense</button>
                </div>
            </div>
        </FormModal>
    )
}
