import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useTheme } from '~/utils/theme'

interface InputModalProps {
  label?: string
  setActive: () => void
  children?: React.ReactNode
}

const InputModal = ({ label = 'Open Modal', setActive, children }: InputModalProps) => {
  const [open, setOpen] = React.useState(false)
  const { mode } = useTheme()

  const handleOpen = () => {
    setActive()
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} disableTouchRipple sx={{ p: 3 }}>
        {label}
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: mode === 'light' ? '#fff' : '#222222',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button sx={{ m: 1, minWidth: '100px' }} onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default InputModal
