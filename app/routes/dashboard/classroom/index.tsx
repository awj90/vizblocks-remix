import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '~/utils/theme'
import Button from '@mui/material/Button'

import ClassroomList from '~/components/ClassroomList'
import { useRootData } from '~/utils/hooks'

import { Form, Link, useNavigate } from '@remix-run/react'
import { supabaseClient } from '~/supabase.client'

export default function Classrooms() {
  const { user, profile } = useRootData()
  const { mode } = useTheme()
  const navigate = useNavigate()

  const isEducator = profile.role === 'educator'

  const handleCreateClassroom = async () => {
    const uid = user?.id
    const created_by = `${profile.firstName} ${profile.lastName}`
    const { data, error } = await supabaseClient.from('classroom').insert({ uid, members: [uid], created_by })
    const classroomId = data?.[0].id
    navigate(`${classroomId}`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: 4,
        my: 2,
        bgcolor: mode === 'light' ? 'white' : '#121212',
        borderRadius: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        maxWidth: 1200,
        minHeight: '100vh',
      }}
    >
      <Typography variant='h4'>Classroom</Typography>
      <Typography variant='subtitle1' sx={{ mb: 4, color: 'GrayText' }}>
        If you would like to create your own classroom, please head over to{' '}
        <Link to='/dashboard/profile' style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>
          profile
        </Link>{' '}
        and update your role to 'Educator'.
      </Typography>

      {isEducator && (
        <Box sx={{ display: 'flex' }}>
          <img src='/assets/classroom.jpeg' alt='classroom' width={300} />
          <Box component={Form} sx={{ mx: 4 }}>
            <Typography sx={{ mb: 4 }}>
              Classroom help educators create a convenient space to interact with students and check their progress on data visualization.
              Get together in a classroom to share your visualizations each other!
            </Typography>

            <Button type='submit' variant='contained' onClick={handleCreateClassroom}>
              Create a classroom
            </Button>
          </Box>
        </Box>
      )}

      <Typography variant='h5' sx={{ my: 4 }}>
        My Classrooms
      </Typography>
      <ClassroomList showJoinedClassrooms />

      <Typography variant='h5' sx={{ my: 4 }}>
        Join a Classroom
      </Typography>
      <ClassroomList />
    </Box>
  )
}
