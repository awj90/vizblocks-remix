import * as React from 'react'
import { Link } from '@remix-run/react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

import FolderIcon from '@mui/icons-material/Folder'
import QuizIcon from '@mui/icons-material/Quiz'
import SchoolIcon from '@mui/icons-material/School'

const data = [
  { icon: <FolderIcon />, label: 'Projects', to: '/dashboard/projects' },
  { icon: <QuizIcon />, label: 'VLAT', to: '/dashboard/vlat' },
  { icon: <SchoolIcon />, label: 'Classroom', to: '/dashboard/classroom' },
]

export default function Home() {
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
          primary='Home'
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '2px',
          }}
          secondary='Projects, VLAT, Classrooms'
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
          <ListItemButton key={item.label} sx={{ py: 1, minHeight: 32 }} component={Link} to={item.to} prefetch='intent'>
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
          </ListItemButton>
        ))}
      <Divider />
    </Box>
  )
}
