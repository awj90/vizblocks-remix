import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import feature1Image from './images/feature-1.png'
import feature2Image from './images/feature-2.png'
import feature3Image from './images/feature-3.png'

const FEATURES = [
  {
    title: 'Choose your visualisation',
    subtitle: 'VizBlocks provides 8 carefully handpicked visualisations options for you kickstart your journey.',
    image: feature1Image,
  },
  {
    title: 'Check your progress',
    subtitle: 'Check your understanding on data visualisations with our Visualisation Literacy Assessment Test (VLAT).',
    image: feature2Image,
  },
  {
    title: 'Inspire creativity',
    subtitle: 'Save and share your visualisations to enrich learning amongst your peers.',
    image: feature3Image,
  },
]

const FEATURE_HEIGHT = 600

export default function Features() {
  return (
    <Box>
      {FEATURES.map(({ title, subtitle, image }, index) => {
        return index % 2 === 0 ? (
          <Container key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
              <Typography variant='h4' fontWeight='700'>
                {title}
              </Typography>
              <br />
              <Typography paragraph fontSize='1.2rem'>
                {subtitle}
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                height: `${FEATURE_HEIGHT}px`,
                width: '50%',
                background: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }}
            />
          </Container>
        ) : (
          <Container key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                height: `${FEATURE_HEIGHT}px`,
                width: '50%',
                background: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }}
            />
            <Box sx={{ padding: '3rem', width: { md: '50%' } }}>
              <Typography variant='h4' fontWeight='700'>
                {title}
              </Typography>
              <br />
              <Typography paragraph fontSize='1.2rem'>
                {subtitle}
              </Typography>
            </Box>
          </Container>
        )
      })}
    </Box>
  )
}
