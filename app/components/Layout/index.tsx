import * as React from 'react'
import Header from './Header'
import Box from '@mui/material/Box'

interface Props {
  isAuthenticated?: boolean
  firstName?: string
  lastName?: string
  children: React.ReactNode
}

export default function Layout({ children, ...others }: Props) {
  return (
    <Box style={{ display: 'flex' }}>
      <Header {...others} />
      {children}
    </Box>
  )
}
