'use client'

import { useEffect, useState, useTransition } from 'react'
import { signup } from '../login/actions'
import Link from "next/link"
import { SiNextdotjs, SiSupabase } from "react-icons/si"

export default function SignupPage() {
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            // Server action will redirect to /login/verify on success
            await signup(formData)
        })
    }

    if (loading) {
        return (
            <main
                className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg.png')" }}
            >
                <div className="text-white text-2xl">Loading...</div>
            </main>
        )
    }

    return (
        <main
            className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            {/* 🔥 Fancy heading above the form */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                    Multimodal AI Chat Application
                </h1>
                <p className="mt-3 flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base">
                    Built with
                    <SiNextdotjs className="text-white text-xl" title="Next.js" />
                    Next.js +
                    <SiSupabase className="text-emerald-400 text-xl" title="Supabase" />
                    Supabase
                </p>
            </div>

            {/* Form Box */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">
                    Create your Account
                </h1>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
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
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
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

                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending
                            ? 'bg-slate-600 opacity-70 cursor-wait animate-pulse'
                            : 'bg-slate-700 hover:bg-slate-800 active:scale-95'
                        }`}
                >
                    {isPending ? 'Signing up...' : 'Sign Up'}
                </button>

                {/* Cross-link */}
                <p className="text-sm text-gray-300 text-center">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-semibold text-indigo-300 hover:text-indigo-200 underline-offset-4 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </main>
    )
}
