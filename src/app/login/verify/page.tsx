'use client'

import Link from "next/link"

export default function Verify() {
    return (
        <main
            className="min-h-screen w-full flex items-center justify-center px-4
                       bg-gradient-to-br from-gray-900 via-black to-gray-800"
        >
            <div
                className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20
                           shadow-2xl rounded-2xl px-8 py-12 text-center"
            >
                {/* Icon / Illustration */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center 
                                rounded-full bg-green-500/20 border border-green-400/30">
                    <span className="text-3xl">📩</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Verify Your Email
                </h3>

                {/* Subtitle */}
                <p className="text-gray-300 mb-8">
                    We’ve sent a verification link to your inbox.
                    Please click the link to activate your account.
                </p>

                {/* Primary Button */}
                <Link
                    href="/login"
                    className="block w-full py-3 rounded-lg bg-indigo-600/80 
                               text-white font-semibold hover:bg-indigo-700/90 
                               transition shadow-md backdrop-blur-sm"
                >
                    Go to Login
                </Link>
            </div>
        </main>
    )
}
