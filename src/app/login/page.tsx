'use client'

import { useEffect, useState, useTransition } from 'react'
import { login } from './actions'
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiNextdotjs, SiSupabase } from "react-icons/si"
import { Zap, Cpu, MessageSquare, Bot } from "lucide-react"

export default function LoginPage() {
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const res = await login(formData)
            if (res?.success) {
                router.push("/")
            } else if (res?.error) {
                setErrorMsg(res.error)
            }
        })
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg.png')" }}>
                <div className="text-white text-2xl">Loading...</div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}>

            {/* LOGIN FIRST ON MOBILE, SECOND ON DESKTOP */}
            <section className="order-1 md:order-2 flex-1 flex flex-col items-center justify-center px-6 py-12">

                {/* HEADER ABOVE LOGIN */}
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

                {/* LOGIN FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight">
                        Log in to your Account
                    </h2>

                    {errorMsg && (
                        <p className="text-center text-red-300">{errorMsg}</p>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input id="email" name="email" type="email" required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input id="password" name="password" type="password" required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
                    </div>

                    <button type="submit" disabled={isPending}
                        className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending ? 'bg-indigo-400 opacity-70 cursor-wait animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'}`}>
                        {isPending ? 'Logging in...' : 'Log In'}
                    </button>

                    <p className="text-sm text-gray-300 text-center">
                        Don’t have an account?{' '}
                        <Link href="/signup" className="font-semibold text-indigo-300 hover:text-indigo-200 underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-sm text-gray-300 text-center mt-2">
                        <Link href="/forgot-password" className="text-indigo-300 hover:text-indigo-200 underline">
                            Forgot your password?
                        </Link>
                    </p>
                </form>
            </section>

            {/* FEATURES SECOND ON MOBILE, FIRST ON DESKTOP */}
            <section className="order-2 md:order-1 flex-1 flex flex-col justify-center items-center px-6 py-12 text-center md:text-left">
                <div className="max-w-lg">
                    {/* GRID FEATURES */}
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 text-center md:text-left shadow-lg hover:scale-105 transition">
                            <Zap className="mx-auto md:mx-0 text-yellow-400 w-10 h-10" />
                            <h3 className="mt-4 text-lg font-semibold text-white">⚡ Lightning Fast</h3>
                            <p className="mt-2 text-gray-300 text-sm">
                                6 chat responses in <span className="text-yellow-300 font-bold">&lt;600ms</span>.<br />
                                Optimized for real-time speed.<br />
                                <span className="text-gray-400 text-xs">
                                    (For comparison: <span className="text-purple-300 font-semibold">GPT-4 averages ~1.3s (1300ms)</span>, and <span className="text-pink-300 font-semibold">GPT-5 is even slower</span>.)
                                </span>
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 text-center md:text-left shadow-lg hover:scale-105 transition">
                            <Bot className="mx-auto md:mx-0 text-pink-400 w-10 h-10" />
                            <h3 className="mt-4 text-lg font-semibold text-white">6 AI Personalities</h3>
                            <p className="mt-2 text-gray-300 text-sm">
                                Chat with <span className="text-pink-300 font-bold">six different AIs</span>,
                                each with unique styles & knowledge. Select what best suits you!
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 text-center md:text-left shadow-lg hover:scale-105 transition">
                            <Cpu className="mx-auto md:mx-0 text-emerald-400 w-10 h-10" />
                            <h3 className="mt-4 text-lg font-semibold text-white">Optimized Backend</h3>
                            <p className="mt-2 text-gray-300 text-sm">
                                Low-latency API built for scale & performance.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 text-center md:text-left shadow-lg hover:scale-105 transition">
                            <MessageSquare className="mx-auto md:mx-0 text-indigo-400 w-10 h-10" />
                            <h3 className="mt-4 text-lg font-semibold text-white">Free & Open Sourced</h3>
                            <p className="mt-2 text-gray-300 text-sm">
                                Explore the code, contribute, and help shape the future.<br />
                                <Link href="https://github.com/your-repo" target="_blank"
                                    className="text-indigo-300 hover:text-indigo-200 underline">
                                    ⭐ Star it on GitHub
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
