'use client'

import { useState, useTransition } from 'react'
import { resetPassword } from './actions'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const res = await resetPassword(formData)
            if (res?.success) {
                setMessage('Password reset email sent! Check your inbox.')
            } else if (res?.error) {
                setMessage(res.error)
            }
        })
    }

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">
                    Forgot your Password?
                </h1>

                {message && <p className="text-center text-red-300">{message}</p>}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Enter your registered email
                    </label>
                    <input id="email" name="email" type="email" required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
                </div>

                <button type="submit" disabled={isPending}
                    className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending ? 'bg-indigo-400 opacity-70 cursor-wait animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'}`}>
                    {isPending ? 'Sending...' : 'Send Reset Link'}
                </button>
                <p className="text-sm text-gray-300 text-center">
                    <Link href="/login" className="font-semibold text-indigo-300 hover:text-indigo-200 underline-offset-4 hover:underline">
                        Back to login
                    </Link>
                </p>
            </form>
        </main>
    )
}
