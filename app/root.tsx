import * as React from 'react'

import { withEmotionCache } from '@emotion/react'
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material'
import { useTheme, ThemeProvider } from '~/utils/theme'
import { useClientStyle } from '~/utils/clientStyleContext'
import { GraphDataProvider } from '~/utils/graphDataContext'
import { magicLinkStrategy } from '~/utils/auth.server'
import type { User } from '@supabase/supabase-js'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react'
import { supabaseAdmin } from './supabase.server'
import type { Profile } from './utils/types'
import carouselStyles from 'pure-react-carousel/dist/react-carousel.es.css'

export const handle: { id: string } = {
  id: 'root',
}

export type LoaderData = {
  user: User | null
  profile: Profile
  env: Window
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return { title: 'VizBlocks' }
}

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: '//fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '//fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', as: 'style' },
    { rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: carouselStyles },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request)
  const { data } = await supabaseAdmin.from('profiles').select().eq('id', session?.user?.id)
  const loaderData = {
    user: session?.user,
    profile: {
      firstName: data?.[0]?.firstName,
      lastName: data?.[0]?.lastName,
      email: session?.user?.email,
      role: data?.[0]?.role,
    },
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
    },
  }

  return json(loaderData)
}

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = useClientStyle()
  const data = useLoaderData<LoaderData>()
  const { theme } = useTheme()

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach(tag => {
      // eslint-disable-next-line no-underscore-dangle
      ;(emotionCache.sheet as any)._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta name='theme-color' content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <meta name='emotion-insertion-point' content='emotion-insertion-point' />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(data?.env)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
})

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <ThemeProvider>
        <GraphDataProvider>
          <Outlet />
        </GraphDataProvider>
      </ThemeProvider>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title='Error!'>
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      break
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <div style={{ margin: 'auto', marginTop: 100 }}>
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </div>
      </Layout>
    </Document>
  )
}
