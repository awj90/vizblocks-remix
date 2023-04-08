import * as React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useToggle from '~/hooks/useToggle'
import { SavedGraphData } from '~/utils/types'
import { useRootData } from '~/utils/hooks'
import { supabaseClient } from '~/supabase.client'
import { useNavigate } from '@remix-run/react'
import { useGraphData } from '~/utils/graphDataContext'
import { GridRowsProp } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from '../DeleteModal'

interface Props {
  data: SavedGraphData
  handleDelete: (id: string) => Promise<void>
}

export default function GraphCard({ data, handleDelete }: Props) {
  const { user } = useRootData()
  const navigate = useNavigate()
  const { graphDispatch } = useGraphData()
  const uid = user?.id ?? ''
  const liked = data.likes.includes(uid)

  const [shadow, setShadow] = React.useState(2)
  const [like, toggleLike] = useToggle(liked)
  const [numLikes, setNumLikes] = React.useState(data.likes.length)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)

  const handleLike = async () => {
    let newLikes = [...new Set(data.likes)]
    if (like) {
      setNumLikes(prev => prev - 1)
      newLikes = newLikes.filter(like => like !== uid)
    } else {
      setNumLikes(prev => prev + 1)
      newLikes.push(uid)
    }
    await supabaseClient.from('graphs').update({ likes: newLikes }).match({ id: data.id })
    toggleLike()
  }

  const handleClick = () => {
    graphDispatch({ type: data.graph_type, data: data.graph_data.data as GridRowsProp })
    navigate(`../create/${data.graph_type}`)
  }

  const handleModalConfirm = async () => {
    await handleDelete(data.id)
    setShowDeleteModal(false)
  }

  const isMyGraph = data.uid === uid
  const goToGraphText = isMyGraph ? `View my ${data.graph_type}` : `View ${data.graph_data.profile.firstName}'s ${data.graph_type}`

  return (
    <>
      <DeleteModal visible={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleConfirm={handleModalConfirm} />
      <Card
        sx={{
          width: 350,
          height: 350,
          margin: 4,
          boxShadow: shadow,
          bgcolor: theme => theme.palette.primary.light,
        }}
        onMouseOver={() => setShadow(5)}
        onMouseOut={() => setShadow(2)}
      >
        <CardMedia
          component='img'
          height='200'
          image={data.graph_data.image}
          alt='Graph Image'
          sx={{ objectFit: 'contain', bgcolor: 'white' }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='subtitle1'>By {data.graph_data.profile.firstName}</Typography>
          </Box>
          <Typography variant='body2'>{data.graph_data.desc}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label='add to favorites' onClick={handleLike}>
              <FavoriteIcon color={like ? 'error' : undefined} />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{numLikes ?? 0}</Typography>
            <IconButton aria-label='delete your graph' onClick={() => setShowDeleteModal(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>

          <Button variant='text' color='secondary' onClick={handleClick} sx={{ maxWidth: 200, overflowX: 'hidden' }}>
            {goToGraphText}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
