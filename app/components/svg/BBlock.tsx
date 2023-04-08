import * as React from 'react'
import { useTheme } from '~/utils/theme'
import useWindowSize from '~/hooks/useWindowSize'

function BBlockIcon() {
  const { theme } = useTheme()
  const breakpoint = theme.breakpoints.values.md

  const { width: windowWidth = breakpoint } = useWindowSize()
  const isMobile = windowWidth < breakpoint

  const height = isMobile ? 25 : 35
  const width = (75 / 109) * height

  return (
    <div style={{ marginRight: '3px' }}>
      <svg width={width} height={height} viewBox='0 0 75 109' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <mask id='path-1-inside-1_30_9' fill='white'>
          <rect y='56' width='75' height='53' rx='3' />
        </mask>
        <rect y='56' width='75' height='53' rx='3' stroke='#6cddaa' strokeWidth='30' mask='url(#path-1-inside-1_30_9)' />
        <mask id='path-2-inside-2_30_9' fill='white'>
          <rect width='75' height='53' rx='3' />
        </mask>
        <rect width='75' height='53' rx='3' stroke='#6cddaa' strokeWidth='30' mask='url(#path-2-inside-2_30_9)' />
      </svg>
    </div>
  )
}

export { BBlockIcon }
