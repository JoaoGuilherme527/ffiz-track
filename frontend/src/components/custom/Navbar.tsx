import Link from "next/link"

const Navbar = () => {
    return <div className="absolute bottom-0 w-full h-20 bg-[var(--green)] flex">
        <Link className="w-5 h-5 bg-red-300" href={"/dashboard/expenses"}>Expenses</Link>
    </div>
}

export default Navbar
