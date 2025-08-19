'use client'

export const dynamic = "force-dynamic";
import { useEffect, useState, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { updatePassword } from './actions'
import { Suspense } from 'react'


export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')


    useEffect(() => {
        if (!code) router.push('/forgot-password')
        const timer = setTimeout(() => setLoading(false), 1)
        return () => clearTimeout(timer)
    }, [code, router])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const newPass = formData.get('new_password') as string
        const confirmPass = formData.get('confirm_password') as string

        if (newPass !== confirmPass) {
            setMessage("Passwords do not match!")
            return
        }

        formData.append('code', code || '')

        startTransition(async () => {
            const res = await updatePassword(formData)
            if (res?.success) {
                setMessage('Password updated! Redirecting to login...')
                setTimeout(() => router.push('/login'), 2000)
            } else {
                setMessage(res?.error || 'Something went wrong')
            }
        })
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.png')" }}>
                <div className="text-white text-2xl">Loading...</div>
            </main>
        )
    }

    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.png')" }}>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-6 py-8 space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">Reset Password</h1>

                    {message && <p className="text-center text-red-300">{message}</p>}

                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-300 mb-1">
                            New Password
                        </label>
                        <input id="new_password" name="new_password" type="password" required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300 mb-1">
                            Confirm Password
                        </label>
                        <input id="confirm_password" name="confirm_password" type="password" required
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
                    </div>

                    <button type="submit" disabled={isPending}
                        className={`w-full py-2 font-semibold rounded-lg transition text-white ${isPending ? 'bg-indigo-400 opacity-70 cursor-wait animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'}`}>
                        {isPending ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </main>
        </Suspense >
    )
}
