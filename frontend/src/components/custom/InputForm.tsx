import {ChangeEvent, HTMLAttributes} from "react"

interface InputFormProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    labelName: string
    name: string
    placeholder: string
    className?: string | undefined
}

export default function InputForm({labelName, name, placeholder, onChange, className}: InputFormProps) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="text-xl  font-normal pl-4">
                {labelName}
            </label>
            <input
                onChange={(e) => onChange && onChange(e)}
                className={`shadow py-2 pl-4 rounded border text-base outline-hidden ${className && className}`}
                id={name}
                name={name}
                type={name}
                placeholder={placeholder}
                required
            />
        </div>
    )
}
