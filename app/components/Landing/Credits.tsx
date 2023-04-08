import * as React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useTheme } from '~/utils/theme'

export default function Credits() {
  const { mode } = useTheme()

  return (
    <Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Typography variant='h6' fontWeight='700' sx={{ letterSpacing: '3px' }}>
          Credits
        </Typography>
        <Typography variant='h6' fontWeight='700' sx={{ letterSpacing: '3px' }}>
          to be filled
        </Typography>
      </Container>
    </Box>
  )
}
