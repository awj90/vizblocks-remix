import * as React from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RuleIcon from '@mui/icons-material/Rule'
import domtoimage from 'dom-to-image'
import fileDownload from 'js-file-download'
import { useGraphData } from '~/utils/graphDataContext'
import { objectToCsvString, handleDownloadCsv } from './utils'
import { supabaseClient } from '~/supabase.client'
import { useRootData } from '~/utils/hooks'
import toast from 'react-hot-toast'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

interface SaveGraphProps {}

const SaveGraph = ({}: SaveGraphProps) => {
  const { user, profile } = useRootData()
  const { graphData, selectedGraph } = useGraphData()
  const selectedGraphData = graphData[selectedGraph]
  const [description, setDescription] = React.useState('')

  const csvString = objectToCsvString(selectedGraphData)
  const handleCsvDownload = () => handleDownloadCsv(csvString, selectedGraph)
  const handlePngDownload = async () => {
    const node = document.getElementById('chart-container')
    const blob = await domtoimage.toBlob(node as Node, { bgcolor: '#fff' })
    fileDownload(blob, 'chart.png')
  }

  const handleSaveOnline = async () => {
    const node = document.getElementById('chart-container')
    const image = await domtoimage.toPng(node as Node, { bgcolor: '#fff' })
    if (description.length === 0) {
      toast.error('Please write a short description to save your chart online')
      return
    }

    const graph_data = { data: selectedGraphData, image, profile, desc: description }
    const { data, error } = await supabaseClient.from('graphs').insert({ graph_type: selectedGraph, graph_data, uid: user?.id, likes: [] })
    if (error) toast.error(`${error?.message}`)
    else {
      toast.success(`Saved!`)
      setDescription('')
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1 }}>
        {selectedGraphData.length > 0 ? (
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 2 }}>
              You can save and download your chart!
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px', rowGap: '8px' }}>
              <Button variant='contained' disableElevation size='large' onClick={handleCsvDownload}>
                Download as CSV
              </Button>
              <Button variant='contained' disableElevation size='large' onClick={handlePngDownload}>
                Download as Image
              </Button>
            </Box>
            <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mt: 2 }}>
              Or you can also save it online!
            </Typography>
            <StyledTextField
              label='Enter your description here'
              type='text'
              name='desc'
              multiline
              rows={4}
              placeholder='Describe your visualization'
              margin='normal'
              required
              value={description}
              onChange={handleChange}
              sx={{ width: 400 }}
            />
            <Button variant='contained' disableElevation size='large' onClick={handleSaveOnline}>
              Save online
            </Button>
          </>
        ) : (
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Please input some data first!
            </Typography>
            <RuleIcon fontSize='large' sx={{ m: 1 }} />
          </>
        )}
      </Box>
    </>
  )
}

export default SaveGraph
