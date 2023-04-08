import * as React from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '~/utils/theme'
import Button from '@mui/material/Button'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import PsychologyIcon from '@mui/icons-material/Psychology'
import { Link } from '@remix-run/react'

export default function VLAT() {
  const { mode } = useTheme()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          mb: 4,
          bgcolor: mode === 'light' ? 'white' : 'black',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          maxWidth: 1200,
        }}
      >
        <Typography variant='h4' sx={{ mb: 4 }}>
          1. What is VLAT?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='/assets/vlat-1.png' alt='book' height={200} />
          <Box sx={{ pl: 4 }}>
            <Typography variant='h5' sx={{ my: 1 }}>
              VLAT: Development of a Visualization Literacy Assessment Test
            </Typography>
            <Typography variant='body1'>
              <strong>Authors:</strong> Sukwon Lee, Sung-Hee Kim, Bum Chul Kwon
            </Typography>
            <Typography variant='body1'>
              <strong>Publication:</strong> IEEE Transactions on Visualization and Computer Graphics | January 2017 |
              https://doi.org/10.1109/TVCG.2016.2598920
            </Typography>
            <Button
              variant='contained'
              sx={{ my: 2 }}
              endIcon={<PictureAsPdfIcon />}
              href='https://www.bckwon.com/pdf/vlat.pdf'
              target='_blank'
              rel='noopener'
            >
              Find out more
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          mb: 4,
          bgcolor: mode === 'light' ? 'rgb(181, 234, 215)' : 'rgb(125, 160, 147)',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          maxWidth: 1200,
        }}
      >
        <Typography variant='h4' sx={{ mb: 4 }}>
          2. Pre-Assessment
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ pr: 4 }}>
            <Typography variant='h5' sx={{ my: 1 }}>
              Take an initial test to assess your proficiency in data visualizations
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              sx={{ my: 2 }}
              endIcon={<PsychologyIcon />}
              component={Link}
              to={'/dashboard/vlat/pre-assessment'}
            >
              Start Now
            </Button>
          </Box>
          <img src='/assets/vlat-3.png' alt='study' height={150} />
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'rgb(199, 206, 234)' : 'rgb(124, 129, 147)',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          maxWidth: 1200,
        }}
      >
        <Typography variant='h4' sx={{ mb: 4 }}>
          3. Post-Assessment
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='/assets/vlat-2.png' alt='test' height={150} />
          <Box sx={{ pl: 4 }}>
            <Typography variant='h5' sx={{ my: 1 }}>
              After exploring Vizblocks, take a post-learning test to gauge your improvements with data visualizations!
            </Typography>
            <Button variant='contained' sx={{ my: 2 }} endIcon={<PsychologyIcon />} component={Link} to={'/dashboard/vlat/post-assessment'}>
              Start Now
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
