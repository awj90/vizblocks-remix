import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from '@remix-run/react'
import * as React from 'react'
import { supabaseClient } from '~/supabase.client'
import { useRootData } from '~/utils/hooks'
import { Classroom } from '~/utils/types'

import ListItem from './ListItem'

interface Props {
  showJoinedClassrooms?: boolean
}

const LIST_ITEM_HEIGHT = 200

const getPagination = (page: number, pageSize: number) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  return { from, to }
}

export default function List({ showJoinedClassrooms = false }: Props) {
  const [page, setPage] = React.useState(1)
  const [showData, setShowData] = React.useState<Classroom[]>([])
  const [totalClassrooms, setTotalClassrooms] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()
  const { user } = useRootData()
  const uid = user?.id ?? ''

  const pageSize = 3
  const numPages = Math.ceil(totalClassrooms / pageSize)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  React.useEffect(() => {
    const { from, to } = getPagination(page, pageSize)
    const getMyClassrooms = async () => {
      const { data, count } = await supabaseClient
        .from('classroom')
        .select('*', { count: 'exact' })
        .contains('members', [uid])
        .order('created_by', { ascending: false })
        .range(from, to)
      setShowData(data ?? [])
      setTotalClassrooms(count ?? 0)
      setLoading(false)
    }
    const getClassrooms = async () => {
      const { from, to } = getPagination(page, pageSize)
      const { data, count } = await supabaseClient
        .from('classroom')
        .select('*', { count: 'exact' })
        .not('members', 'cs', `{${uid}}`)
        .order('created_by', { ascending: false })
        .range(from, to)
      setShowData(data ?? [])
      setTotalClassrooms(count ?? 0)
      setLoading(false)
    }
    showJoinedClassrooms ? getMyClassrooms() : getClassrooms()
  }, [page, pageSize, showJoinedClassrooms, uid])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {showData.length === 0 ? (
        <Typography textAlign='center'>No Classrooms</Typography>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={numPages} page={page} onChange={handleChange} />
          </div>
          <Box sx={{ mt: 1, overflowY: 'auto', maxHeight: LIST_ITEM_HEIGHT * pageSize }}>
            {showData?.map((item, _) => {
              const { title, created_by, id, likes = [], members = [] } = item

              const handleClick = async () => {
                const uniqueMembers = new Set([...members, uid])
                const newMembers = [...uniqueMembers]
                await supabaseClient
                  .from('classroom')
                  .update({ ...item, members: newMembers })
                  .match({ id })
                navigate(id)
              }
              const handleLike = async (newLikes: string[]) => {
                await supabaseClient
                  .from('classroom')
                  .update({ ...item, likes: newLikes })
                  .match({ id })
              }

              return (
                <ListItem
                  key={id}
                  title={title}
                  creator={created_by}
                  buttonText={showJoinedClassrooms ? 'Enter' : 'Join'}
                  onClick={handleClick}
                  onLike={handleLike}
                  likes={likes}
                />
              )
            })}
          </Box>
        </>
      )}
    </>
  )
}
