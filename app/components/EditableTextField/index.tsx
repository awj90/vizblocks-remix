import * as React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

import Box from '@mui/system/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

interface Props {
  value: string
  fontSize?: number | string
  onSave: (value: string) => Promise<void>
  editable?: boolean
}

export default function EditableTextField({ value = 'My Classroom', onSave, fontSize = 40, editable }: Props) {
  const [text, setText] = React.useState(value)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleEdit = () => setIsEditing(true)
  const handleSave = async () => {
    setIsEditing(false)
    onSave(text)
  }

  return (
    <div style={{ width: '100%' }}>
      {!isEditing ? (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize }}>{text}</Typography>
          {editable && (
            <Tooltip title='Edit' placement='left'>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <TextField
            variant='outlined'
            multiline
            maxRows={7}
            fullWidth
            autoFocus
            value={text}
            onChange={event => setText(event.target.value)}
            InputProps={{ sx: { fontSize } }}
            inputProps={{ maxLength: 500 }}
            placeholder={'Enter something'}
            // onBlur={event => setIsEditing(false)}
          />
          <Tooltip title='Save' placement='left'>
            <IconButton onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </div>
  )
}
