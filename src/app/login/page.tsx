'use client'
import { SiGithub, SiNextdotjs, SiSupabase, SiLinkedin } from "react-icons/si"
import { useEffect, useState, useTransition } from 'react'
import { login } from './actions'
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Zap, Cpu, Bot } from "lucide-react"

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
        <main className="min-h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}>

            {/* GitHub Button */}
            <a
                href="https://github.com/iiioooiso/Fiesta-Multi-Ai-Chat"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 
             backdrop-blur-md rounded-full shadow-lg text-white text-sm font-semibold hover:bg-white/20 
             transition active:scale-95"
            >
                <SiGithub className="w-5 h-5 text-white" />
                Star it
            </a>

            {/* Heading Center Top */}
            <div className="mt-20 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
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

            {/* Hero Section: Intro + Login */}
            <section className="flex flex-col md:flex-row flex-1 w-full px-6 py-16 gap-12 items-center justify-center">

                {/* Intro Left (desktop) */}
                <div className="hidden md:flex flex-1 flex-col justify-center max-w-xl">
                    <h2 className="text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
                        <span className="text-white">Hello </span>
                        <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                            Dosto
                        </span>
                        <span className="text-white">!</span>
                    </h2>

                    <div className="mt-8 space-y-5 text-lg text-gray-200 leading-relaxed">
                        <p>Today, I’m going to expose… oh wait… <span className="font-semibold text-white">introduce</span> you to my revolutionary startup.</p>
                        <p>You might be thinking: <span className="italic text-gray-100">“Arre, yeh toh bas kuch APIs ka wrapper hai?”</span></p>
                        <p>And you’re absolutely correct.</p>
                        <p>But when <span className="font-semibold text-white">I</span> do it, it magically becomes… <span className="text-pink-400 font-extrabold tracking-wide">INNOVATION™</span></p>
                    </div>
                </div>

                {/* Login Right */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6"
                >
                    <h2 className="text-3xl font-bold text-white text-center tracking-tight">
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

            {/* Intro (mobile only, under login box) */}
            <section className="md:hidden px-6 mt-8 text-center">
                <h2 className="text-4xl font-extrabold leading-tight drop-shadow-lg">
                    <span className="text-white">Hello </span>
                    <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                        Dosto
                    </span>
                    <span className="text-white">!</span>
                </h2>
                <div className="mt-6 space-y-4 text-base text-gray-200 leading-relaxed">
                    <p>Today, I’m going to expose… oh wait… <span className="font-semibold text-white">introduce</span> you to my revolutionary startup.</p>
                    <p>You might be thinking: <span className="italic text-gray-100">“Arre, yeh toh bas kuch APIs ka wrapper hai?”</span></p>
                    <p>And you’re absolutely correct.</p>
                    <p>But when <span className="font-semibold text-white">I</span> do it, it magically becomes… <span className="text-pink-400 font-extrabold">INNOVATION™</span></p>
                </div>
            </section>

            {/* Qualities Grid */}
            <section className="px-6 py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                        <Zap className="mx-auto text-yellow-400 w-10 h-10" />
                        <h3 className="mt-4 text-lg font-semibold text-white">⚡ Lightning Fast</h3>
                        <p className="mt-2 text-gray-300 text-sm">
                            Responses in &lt;600ms. Optimized for real-time.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                        <Bot className="mx-auto text-pink-400 w-10 h-10" />
                        <h3 className="mt-4 text-lg font-semibold text-white">6 AI Personalities</h3>
                        <p className="mt-2 text-gray-300 text-sm">
                            Unique AIs with different styles & knowledge.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                        <Cpu className="mx-auto text-emerald-400 w-10 h-10" />
                        <h3 className="mt-4 text-lg font-semibold text-white">Optimized Backend</h3>
                        <p className="mt-2 text-gray-300 text-sm">
                            Low-latency API built for scale & performance.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition">
                        <SiGithub className="mx-auto text-white w-10 h-10" />
                        <h3 className="mt-4 text-lg font-semibold text-white">Open Source</h3>
                        <p className="mt-2 text-gray-300 text-sm">
                            Explore the code, contribute, and shape the future.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer with Buttons */}
            <footer className="flex justify-center gap-6 py-10 border-t border-white/10">
                <a href="https://www.linkedin.com/in/ashutosh-singh-350b33291/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition">
                    <SiLinkedin className="w-5 h-5" /> Meet the Developer
                </a>
                <a href="https://github.com/iiioooiso/Fiesta-Multi-Ai-Chat" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition">
                    <SiGithub className="w-5 h-5" /> GitHub Repo
                </a>
            </footer>
        </main>
    )
}
