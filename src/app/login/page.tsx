'use client'

import { useEffect, useState, useTransition } from 'react'
import { login, signup } from './actions'
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [actionType, setActionType] = useState<'login' | 'signup' | null>(null)

    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        if (actionType === 'login') {
            startTransition(() => {
                (async () => {
                    try {
                        await login(formData)
                        router.push("/") // after login
                    } catch (err) {
                        console.error("Login failed:", err)
                    }
                })()
            })
        } else if (actionType === 'signup') {
            startTransition(() => {
                (async () => {
                    try {
                        await signup(formData)
                        router.push("/login/verify") // after signup
                    } catch (err) {
                        console.error("Signup failed:", err)
                    }
                })()
            })
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg.png')" }}
            >
                <div className="text-white text-2xl">Loading...</div>
            </main>
        )
    }

    return (
        <main
            className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/login.png')" }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">
                    Create your Account
                </h1>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit" // ✅ ensures form submits
                        onClick={() => setActionType('login')}
                        disabled={isPending}
                        className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending && actionType === 'login'
                                ? 'bg-indigo-400 opacity-50 cursor-not-allowed'
                                : 'bg-indigo-500 hover:bg-indigo-600'
                            }`}
                    >
                        {isPending && actionType === 'login' ? 'Logging in...' : 'Log In'}
                    </button>
                    <button
                        type="submit" // ✅ ensures form submits
                        onClick={() => setActionType('signup')}
                        disabled={isPending}
                        className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending && actionType === 'signup'
                                ? 'bg-slate-600 opacity-50 cursor-not-allowed'
                                : 'bg-slate-700 hover:bg-slate-800'
                            }`}
                    >
                        {isPending && actionType === 'signup' ? 'Signing up...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </main>
    )
}
