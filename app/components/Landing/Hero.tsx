import * as React from 'react'
import { Link } from '@remix-run/react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import heroImage from './images/hero.png'
import heroDarkImage from './images/hero-dark.png'
import { useTheme } from '~/utils/theme'

export default function Hero() {
  const { mode } = useTheme()

  return (
    <Box sx={{ backgroundColor: `${mode === 'dark' ? 'white' : '#121212'}` }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
          <Box>
            <Typography variant='h2' fontWeight='900' sx={{ color: `${mode === 'dark' ? 'black' : 'white'}` }}>
              Learn. Create.
            </Typography>
            <Typography variant='h1' fontWeight='900' color='#6cddaa'>
              Visualise.
            </Typography>
          </Box>
          <Typography variant='h5' sx={{ paddingTop: '1rem', paddingBottom: '2rem', color: `${mode === 'dark' ? 'black' : 'white'}` }}>
            VizBlocks is your friendly companion to improve data literacy for children.
            <br />
            <br />
            What will you create?
          </Typography>

          <Button variant='contained' size='large' component={Link} to='/login' prefetch='intent' color='primary'>
            <Typography variant='h6' fontWeight='700'>
              Get Started
            </Typography>
          </Button>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '700px',
            width: '50%',
            background: `url(${mode === 'dark' ? heroImage : heroDarkImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      </Container>
    </Box>
  )
}
