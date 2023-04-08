import * as React from 'react'
import createEmotionCache from './createEmotionCache'
import { CacheProvider } from '@emotion/react'

const ClientStyleContext = React.createContext<{ reset: () => void }>({
  reset: () => {},
})

function ClientStyleProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = React.useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

function useClientStyle() {
  const context = React.useContext(ClientStyleContext)
  if (context === undefined) {
    throw new Error('useClientStyle must be used within a ClientStyleProvider')
  }
  return context
}

export { ClientStyleProvider, useClientStyle }
