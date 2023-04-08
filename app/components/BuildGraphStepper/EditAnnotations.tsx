import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import { useGraphData } from '~/utils/graphDataContext'
import { useLocation } from '@remix-run/react'
import { GRAPH_TYPES } from '~/utils/types'

interface EditAnnocationsProps {}

const EditAnnocations = ({}: EditAnnocationsProps) => {
  const { mode } = useTheme()
  const { parameters, setParameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const location = useLocation()
  const graphType = location.pathname.replace('/dashboard/create/', '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParam = {
      [event.target.name]: event.target.value,
    }
    setParameters(prevParams => ({ ...prevParams, ...newParam }))
  }

  const ADJUSTABLE_PARAMETERS = [
    { name: 'title', label: 'Graph Title', type: 'text', value: title, hide: [''] },
    {
      name: 'xlabel',
      label: 'X-axis Title',
      type: 'text',
      value: xlabel,
      hide: [GRAPH_TYPES.heatmap, GRAPH_TYPES.pictograph, GRAPH_TYPES.piechart],
    },
    {
      name: 'ylabel',
      label: 'Y-axis Title',
      type: 'text',
      value: ylabel,
      hide: [GRAPH_TYPES.heatmap, GRAPH_TYPES.pictograph, GRAPH_TYPES.piechart],
    },
  ]

  return (
    <>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          [`& .MuiInputLabel-root`]: { color: mode === 'light' ? '#000' : '#fff' },
        }}
        noValidate
        autoComplete='off'
      >
        <Typography variant='h6'>Chart Annotations</Typography>
        {ADJUSTABLE_PARAMETERS.map((parameter, index) => {
          if (parameter.hide.includes(graphType)) return null
          return (
            <TextField
              key={index}
              id={parameter.name}
              name={parameter.name}
              label={parameter.label}
              variant='standard'
              margin='normal'
              type={parameter.type}
              value={parameter.value}
              onChange={handleChange}
            />
          )
        })}
      </Box>
    </>
  )
}

export default EditAnnocations
