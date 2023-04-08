import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'
import useToggle from '~/hooks/useToggle'
import { useRootData } from '~/utils/hooks'

interface Props {
  title: string
  creator: string
  buttonText: string
  onClick: () => void
  image?: string
  likes: string[]
  onLike?: (likes: string[]) => Promise<void>
}

export default function ListItem({ title = 'title', creator, image, buttonText = 'join', onClick, likes, onLike }: Props) {
  const { user } = useRootData()
  const uid = user?.id ?? ''

  const liked = likes?.includes(uid)
  const initNumLikes = likes ? likes.length : 0

  const [like, toggleLike] = useToggle(liked)
  const [numLikes, setNumLikes] = React.useState(initNumLikes)

  const imageSrc = image ?? '/assets/classroom.jpeg'

  const handleLike = async () => {
    let newLikes: string[] = likes ? [...likes] : []
    if (like) {
      setNumLikes(prev => prev - 1)
      newLikes = newLikes.filter(like => like !== uid)
    } else {
      setNumLikes(prev => prev + 1)
      newLikes.push(uid)
    }
    await onLike?.(newLikes)
    toggleLike()
  }

  return (
    <>
      <Box sx={{ p: 2, border: 1, borderRadius: 4, mt: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <img src={imageSrc} alt='graph or classroom' width={200} />
          <Box sx={{ mx: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <Typography variant='h6'>{title}</Typography>
              <Typography>By {creator}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label='like' onClick={handleLike}>
                  <FavoriteIcon color={like ? 'error' : undefined} />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{numLikes}</Typography>
              </Box>
              <Button onClick={onClick}>{buttonText}</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
