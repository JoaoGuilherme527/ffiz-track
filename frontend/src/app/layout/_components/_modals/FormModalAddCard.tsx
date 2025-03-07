import FormModal, {FormModalProps} from "@/src/components/forms/FormModal"
import {Input} from "@/src/components/ui/input"
import {FormEvent} from "react"

export default function FormModalAddCard({isModalOpen, onSubmit, setIsModalOpen, onClose}: FormModalProps) {
    return (
        <FormModal isModalOpen={isModalOpen} onClose={onClose} onSubmit={onSubmit} setIsModalOpen={setIsModalOpen}>
            <div className="">
                <label htmlFor="name" className="text-sm text-gray-700">
                    Card name
                </label>
                <Input required id="name" name="name" type="text" placeholder="name of your card" />
            </div>
            <div className="">
                <label htmlFor="limit" className="text-sm text-gray-700">
                    Card limit
                </label>
                <Input required id="limit" name="limit" type="number" placeholder="limit of your card" step={"0.01"} />
            </div>
            <div className="">
                <label htmlFor="color" className="text-sm text-gray-700">
                    Card color
                </label>
                <Input required id="color" defaultValue="green" name="color" type="color" placeholder="color of your card" step={"0.01"} />
            </div>
            <div className="w-full flex justify-center py-2">
                <div className="text-sm text-white py-2 px-10 rounded font-bold bg-green-700">
                    <button type="submit">Add Card</button>
                </div>
            </div>
        </FormModal>
    )
}
