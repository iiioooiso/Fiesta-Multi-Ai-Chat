
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'


export async function logout() {


    const supabase = await createClient()

    // Sign out the user
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error('Failed to log out')
    }

    // Optionally, you can redirect or revalidate the path
    revalidatePath('/', 'layout')
    redirect('/')
}