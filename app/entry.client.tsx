import * as React from 'react'
import { hydrate } from 'react-dom'
import { RemixBrowser } from '@remix-run/react'
import { ClientStyleProvider } from './utils/clientStyleContext'

hydrate(
  <ClientStyleProvider>
    <RemixBrowser />
  </ClientStyleProvider>,
  document,
)
