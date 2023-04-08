import * as React from 'react'

import { magicLinkStrategy } from '~/utils/auth.server'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import CollapsibleMenu from '~/components/CollapsibleMenu'
import type { User } from '@supabase/supabase-js'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import Layout from '~/components/Layout'
import { supabaseAdmin } from '~/supabase.server'

type LoaderData = { user: User | null; firstName: string; lastName: string }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request, {
    failureRedirect: '/login',
  })
  const { data } = await supabaseAdmin.from('profiles').select().eq('id', session?.user?.id)
  const loaderData = {
    user: session?.user ?? null,
    firstName: data?.[0]?.firstName,
    lastName: data?.[0]?.lastName,
  }

  return json<LoaderData>(loaderData)
}

const drawerWidth = 240

export default function Dashboard() {
  const { user, firstName, lastName } = useLoaderData<LoaderData>()
  const isAuthenticated = user?.aud === 'authenticated'

  return (
    <Layout isAuthenticated={isAuthenticated} firstName={firstName} lastName={lastName}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingTop: '1rem',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <CollapsibleMenu />
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'rgba(108, 221, 170, 0.2)', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Layout>
  )
}
