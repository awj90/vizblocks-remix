import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'

export default function CommingSoon() {
  const { mode } = useTheme()

  return (
    <div style={{ padding: 16 }}>
      <Box
        sx={{
          width: '100%',
          p: 4,
          my: 2,
          bgcolor: mode === 'light' ? 'white' : '#121212',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <Typography variant='h4' textAlign='center' sx={{ mb: 4 }}>
          Coming Soon
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src='/assets/coming-soon.svg' alt='construction' width={400} />
        </Box>
      </Box>
    </div>
  )
}
