import * as React from 'react'

import { authenticator, magicLinkStrategy } from '~/utils/auth.server'
import Landing from '~/components/Landing'
import { ActionFunction, json, LoaderFunction } from '@remix-run/node'
import Layout from '~/components/Layout'
import { User } from '@supabase/supabase-js'
import { useLoaderData } from '@remix-run/react'
import { supabaseAdmin } from '~/supabase.server'

type LoaderData = { user: User | null; firstName: string; lastName: string }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request)
  const { data } = await supabaseAdmin.from('profiles').select().eq('id', session?.user?.id)
  const loaderData = {
    user: session?.user ?? null,
    firstName: data?.[0]?.firstName,
    lastName: data?.[0]?.lastName,
  }

  return json<LoaderData>(loaderData)
}

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('sb-magic-link', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { user, firstName, lastName } = useLoaderData<LoaderData>()
  const isAuthenticated = user?.aud === 'authenticated'

  return (
    <Layout isAuthenticated={isAuthenticated} firstName={firstName} lastName={lastName}>
      <Landing />
    </Layout>
  )
}
