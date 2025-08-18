// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/client'
import AIComparisonApp from './components/AIComparisonApp'

import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        router.push('/login') // redirect if not logged in
      } else {
        setUser(data.session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [router])

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      {user && <AIComparisonApp />}
    </div>
  )
}
