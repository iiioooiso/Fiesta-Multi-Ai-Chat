'use server'

import { createClient } from '../../../utils/supabase/server'

/**
 * Send magic link login
 */
export async function login(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            // 🔑 Dynamically use correct redirect (local vs prod)
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/login`,
        },
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Sign up with email+password
 */
export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // 🔑 Same redirect applies for signup
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}?next=/login`,
        },
    })

    if (error) {
        return { success: false, error: error.message }
    }

    // Let client-side handle UI navigation (e.g. "check your email" screen)
    return { success: true }
}
