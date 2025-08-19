'use server'

import { createClient } from '../../../utils/supabase/server'

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`, // where new password form is
    })

    if (error) {
        return { success: false, error: error.message }
    }
    return { success: true }
}
