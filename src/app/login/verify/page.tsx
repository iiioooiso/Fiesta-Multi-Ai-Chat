'use client'

import Link from "next/link"

export default function Verify() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-12 text-center">
                {/* Icon / Illustration */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl">📩</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Verify Your Email
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-8">
                    We’ve sent a verification link to your inbox.
                    Please click the link to activate your account.
                </p>

                {/* Primary Button */}
                <Link
                    href="/login"
                    className="block w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
                >
                    Go to Login
                </Link>

                {/* Secondary Action */}
                <p className="text-sm text-gray-500 mt-6">
                    Didn’t receive the email?{" "}
                    <button
                        onClick={() => alert("Resend verification link logic here")}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Resend
                    </button>
                </p>
            </div>
        </main>
    )
}
