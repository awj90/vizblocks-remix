import * as React from 'react'
import { Link } from '@remix-run/react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

import ShowChartIcon from '@mui/icons-material/ShowChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import BlurLinearIcon from '@mui/icons-material/BlurLinear'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import GradientIcon from '@mui/icons-material/Gradient'

const data = [
  { icon: <ShowChartIcon />, label: 'Line Chart', to: '/dashboard/create/linechart' },
  { icon: <BarChartIcon />, label: 'Bar Chart', to: '/dashboard/create/barchart' },
  { icon: <PieChartIcon />, label: 'Pie Chart', to: '/dashboard/create/piechart' },
  { icon: <ScatterPlotIcon />, label: 'Scatter Plot', to: '/dashboard/create/scatterplot' },
  { icon: <BlurLinearIcon />, label: 'Dot Plot', to: '/dashboard/create/dotplot' },
  { icon: <InsertPhotoIcon />, label: 'Pictograph', to: '/dashboard/create/pictograph' },
  { icon: <StackedBarChartIcon />, label: 'Histogram', to: '/dashboard/create/histogram' },
  { icon: <GradientIcon />, label: 'Heat Map', to: '/dashboard/create/heatmap' },
]

export default function Create() {
  const [open, setOpen] = React.useState(true)

  return (
    <Box
      sx={{
        bgcolor: open ? 'inherit' : null,
        pb: open ? 2 : 0,
      }}
    >
      <ListItemButton
        alignItems='flex-start'
        onClick={() => setOpen(!open)}
        sx={{
          px: 3,
          pt: 2.5,
          pb: open ? 0 : 2.5,
          '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
        }}
      >
        <ListItemText
          primary='Create'
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '2px',
          }}
          secondary='Line Chart, Bar Chart, Pie Chart, Scatter Plot, Dot Plot, Pictograph, Historygram, Heat Map'
          secondaryTypographyProps={{
            noWrap: true,
            fontSize: 12,
            lineHeight: '16px',
            color: open ? 'rgba(0,0,0,0)' : theme => theme.palette.text.primary,
          }}
          sx={{ my: 0 }}
        />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            opacity: 0,
            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s',
          }}
        />
      </ListItemButton>
      {open &&
        data.map(item => (
          <ListItemButton key={item.label} sx={{ py: 1, minHeight: 32 }} component={Link} to={item.to}>
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
          </ListItemButton>
        ))}
      <Divider />
    </Box>
  )
}
