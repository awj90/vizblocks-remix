import { useMatches } from '@remix-run/react'
import * as React from 'react'

import type { LoaderData as RootLoaderData } from '../root'
import { handle as rootHandle } from '../root'

export function useMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches()
  const match = matches.find(({ handle }) => handle?.id === handleId)
  if (!match) {
    throw new Error(`No active route has a handle ID of ${handleId}`)
  }
  return match.data as LoaderData
}

export const useRootData = () => useMatchLoaderData<RootLoaderData>(rootHandle.id)
