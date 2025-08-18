'use server'

import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Login (password OR magic link)
 */
export async function login(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string | null

    if (password) {
        // 🔑 Login with email + password
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return { success: false, error: error.message }
        }

        redirect('/')
    } else {

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/`,
            },
        })

        if (error) {
            return { success: false, error: error.message }
        }
        redirect('/verify')
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/`,
        },
    })

    if (error) {
        return { success: false, error: error.message }
    }

    // ✅ Send to verify page after signup
    redirect('/verify')
}
