import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Box from '@mui/material/Box'
import Waves from '../svg/Waves'

const svgString = encodeURIComponent(renderToStaticMarkup(<Waves />))
const dataUri = `url("data:image/svg+xml,${svgString}")`

export default function Footer() {
  return (
    <footer style={{ width: '100%' }}>
      <Box
        sx={{
          background: dataUri,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100px',
        }}
      />
    </footer>
  )
}
