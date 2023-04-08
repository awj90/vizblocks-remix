import { useEffect } from 'react'

import { authenticator } from '~/utils/auth.server'
import { supabaseClient } from '~/supabase.client'
import type { ActionFunction } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('sb-magic-link', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}

export default function LoginCallback() {
  const submit = useSubmit()

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const formData = new FormData()
        formData.append('session', JSON.stringify(session))
        submit(formData, { method: 'post' })
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [submit])

  return null
}
