import * as React from 'react'
import { Link } from '@remix-run/react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { VizBlocks } from '../svg/VizBlocks'
import { useTheme } from '~/utils/theme'

export default function Banner() {
  const { mode } = useTheme()

  return (
    <Box
      sx={{
        background: mode === 'light' ? 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 50%)' : 'linear-gradient(45deg, #2c3e50 40%, #4caf7d)',
      }}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Box sx={{ padding: '1rem', textAlign: 'center' }}>
          <Typography variant='h3' fontWeight='700' sx={{ letterSpacing: '5px' }}>
            Learn. Create. Visualise.
          </Typography>
          <Typography variant='h5' fontWeight='700' sx={{ letterSpacing: '3px' }}>
            with
          </Typography>
          <VizBlocks />
        </Box>
        <Box sx={{ paddingBottom: '1rem' }}>
          <Button variant='contained' size='large' component={Link} to='/login' prefetch='intent' color='secondary'>
            <Typography variant='h6' fontWeight='700'>
              Get Started
            </Typography>
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
