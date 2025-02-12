import Link from "next/link"

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
                Dashboard
            </Link>
            <nav></nav>
        </div>
    )
}
