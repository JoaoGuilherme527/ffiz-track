/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import HomeHeader from "../components/custom/HomeHeader"

export default function Home() {
    return (
        <div>
            <HomeHeader />
            <div className="min-h-screen bg-linear-to-b from-green-900 to-green-700 text-white flex flex-col items-center">
                {/* Hero Section */}
                <header className="text-center py-20 max-w-4xl">
                    <h1 className="text-5xl font-bold">Take Control of Your Finances</h1>
                    <p className="mt-4 text-lg">Track your expenses, monitor your profits, and stay on top of your budget.</p>
                    <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Get Started</button>
                </header>

                {/* Features Section */}
                <section className="py-16 bg-white text-black text-center w-full flex justify-center">
                    <div className="max-w-6xl w-full">
                        <h2 className="text-3xl font-semibold">Why Choose Our App?</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Track Expenses</h3>
                                <p className="mt-2 text-gray-600">Easily log and categorize your expenses.</p>
                            </div>
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Monitor Profits</h3>
                                <p className="mt-2 text-gray-600">Keep an eye on your income sources effortlessly.</p>
                            </div>
                            <div className="p-6 shadow-lg rounded-lg bg-green-100">
                                <h3 className="text-xl font-bold">Visual Insights</h3>
                                <p className="mt-2 text-gray-600">Get clear, intuitive financial summaries.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <footer className="text-center py-10 max-w-4xl w-full">
                    <h2 className="text-2xl font-semibold">Start Managing Your Finances Today</h2>
                    <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Sign Up Now</button>
                </footer>
            </div>
        </div>
    )
}
