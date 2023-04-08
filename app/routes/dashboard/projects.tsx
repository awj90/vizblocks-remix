import * as React from 'react'
import MyGraphs from '~/components/MyGraphs'
import { SavedGraphData } from '~/utils/types'
import Box from '@mui/material/Box'
import { useTheme } from '~/utils/theme'
import Typography from '@mui/material/Typography'
import { supabaseClient } from '~/supabase.client'
import toast from 'react-hot-toast'

export default function Projects() {
  const { mode } = useTheme()
  const [data, setData] = React.useState<SavedGraphData[] | undefined>()

  React.useEffect(() => {
    const fetchAllGraphs = async () => {
      const { data, error } = await supabaseClient.from('graphs').select()
      if (data) setData(data)
    }
    fetchAllGraphs()
  }, [])
  // const data = useLoaderData<LoaderData>() ?? []

  const handleDeleteFromProjects = async (id: string) => {
    const { error } = await supabaseClient.from('graphs').delete().match({ id })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Deleted!')
    }
    window.location.reload()
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: 4,
        my: 2,
        bgcolor: mode === 'light' ? 'white' : '#121212;',
        borderRadius: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        minHeight: '50vh',
      }}
    >
      <Typography variant='h4' sx={{ mb: 4 }}>
        Projects
      </Typography>
      <MyGraphs graphData={data} handleDelete={handleDeleteFromProjects} />
    </Box>
  )
}
