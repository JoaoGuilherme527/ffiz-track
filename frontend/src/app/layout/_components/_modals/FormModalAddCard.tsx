import FormModal, {FormModalProps} from "@/src/components/forms/FormModal"
import {Input} from "@/src/components/ui/input"
import {FormEvent} from "react"

export default function FormModalAddCard({isModalOpen, onSubmit, setIsModalOpen, onClose}: FormModalProps) {
    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-gray-700">
                    Card name
                </label>
                <Input required id="name" name="name" type="text" placeholder="name of your card" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="limit" className="text-sm text-gray-700">
                    Card limit
                </label>
                <Input required id="limit" name="limit" type="number" placeholder="R$ 1.000,00" step={"0.01"} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="expirationDate" className="text-sm text-gray-700">
                    Expiration date
                </label>
                <Input required id="expirationDate" name="expirationDate" type="date" placeholder="01/01" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="color" className="text-sm text-gray-700">
                    Card color
                </label>
                <Input required id="color" defaultValue="green" name="color" type="color" placeholder="color of your card" />
            </div>
            <div className="w-full flex justify-center py-4">
                <div className="text-sm text-white py-2 px-10 rounded font-bold bg-green-700 flex-1 text-center">
                    <button type="submit">Add Card</button>
                </div>
            </div>
        </FormModal>
    )
}
