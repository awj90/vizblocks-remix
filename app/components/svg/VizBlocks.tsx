import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { BBlockIcon } from './BBlock'

function VizBlocks() {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <Typography variant='h4' fontWeight='bold' sx={{ mr: '7px', fontSize: { md: '3rem' } }}>
        VIZ
      </Typography>

      <BBlockIcon />

      <Typography variant='h4' fontWeight='bold' sx={{ fontSize: { md: '3rem' } }}>
        LOCKS
      </Typography>
    </Box>
  )
}

export { VizBlocks }
