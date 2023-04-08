import * as React from 'react'
import { Outlet } from '@remix-run/react'
import Box from '@mui/material/Box'
import BuildGraphStepper from '~/components/BuildGraphStepper'
import { useTheme } from '~/utils/theme'

function Create() {
  const { mode } = useTheme()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BuildGraphStepper />
      <Box
        sx={{
          height: '75vh',
          backgroundColor: mode === 'light' ? '#fff' : '#121212',
          padding: '48px',
          borderRadius: '10px',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
        id='chart-container'
      >
        <Outlet />
      </Box>
    </div>
  )
}

export default Create
