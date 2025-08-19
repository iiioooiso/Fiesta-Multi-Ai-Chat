'use server'

import { createClient } from '../../../utils/supabase/server'

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const new_password = formData.get('new_password') as string
    const code = formData.get('code') as string

    const { error } = await supabase.auth.exchangeCodeForSession(code) // consume the magic link code
    if (error) return { success: false, error: error.message }

    const { error: updateError } = await supabase.auth.updateUser({ password: new_password })
    if (updateError) return { success: false, error: updateError.message }

    return { success: true }
}
