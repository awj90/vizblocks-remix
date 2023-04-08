import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { useTheme } from '~/utils/theme'
import { IconButton } from '@mui/material'

import { Link } from '@remix-run/react'

import Tooltip from '@mui/material/Tooltip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { GRAPH_TYPES } from '~/utils/types'
import { graphData } from './constants'
import { supabaseClient } from '~/supabase.client'
import { useRootData } from '~/utils/hooks'

type Score = {
  graph_type: GRAPH_TYPES
  score: number
}

export default function PreAssessment() {
  const { mode } = useTheme()
  const { user } = useRootData()
  const [scores, setScores] = React.useState<Score[] | null>()

  React.useEffect(() => {
    const fetchData = async () => {
      const uid = user?.id
      const { data } = await supabaseClient.from('vlat').select().eq('uid', uid).eq('test_type', 'pre')
      setScores(data)
    }
    fetchData()
  }, [user?.id])

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
        <IconButton component={Link} to='/dashboard/vlat'>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ mb: 4 }} textAlign='center'>
            Pre-Assessment
          </Typography>
          <img src='/assets/vlat-3.png' alt='study' height={200} />
        </Box>
        <Grid container sx={{ my: 2 }} rowSpacing={4} columnSpacing={2}>
          {graphData.map((chart, index) => {
            const { label, icon, to, hidden, graphType } = chart
            if (hidden) return null

            const preTestScores = scores?.filter(score => score.graph_type === graphType) ?? []
            const highestScore = preTestScores.length > 0 ? Math.max(...preTestScores.map(s => s?.score)) : 0
            const disabled = preTestScores.length > 0

            return (
              <Grid item xs={4} key={index}>
                <Tooltip
                  title={disabled ? 'You have already attempted it once. Please proceed to the post assessment when ready.' : ''}
                  arrow
                  placement='top'
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      sx={{ width: 200 }}
                      variant='outlined'
                      color='secondary'
                      size='large'
                      startIcon={icon}
                      component={Link}
                      to={to}
                      disabled={disabled}
                    >
                      {label}
                    </Button>
                    <Typography variant='subtitle1' sx={{ mt: 2 }}>
                      Top Score: {highestScore}
                    </Typography>
                  </Box>
                </Tooltip>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}
