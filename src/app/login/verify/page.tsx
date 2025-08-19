'use client'

import Link from "next/link"

export default function Verify() {
    return (
        <main
            className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-8 py-10 text-center">

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500/10 border border-green-400/20 shadow-md">
                    <span className="text-3xl">📩</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Verify Your Email
                </h3>

                {/* Subtitle */}
                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    We’ve sent a verification link to your inbox. <br />
                    Please click the link to activate your account.
                </p>

                {/* Primary Button */}
                <Link
                    href="/login"
                    className="block w-full py-3 rounded-lg bg-indigo-600/80 text-white font-semibold hover:bg-indigo-700/90 active:scale-95 transition shadow-md backdrop-blur-sm"
                >
                    Go to Login
                </Link>
            </div>
        </main>
    )
}
