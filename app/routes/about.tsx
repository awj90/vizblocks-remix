import * as React from 'react'
import { Link } from '@remix-run/react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function About() {
  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        Remix with TypeScript example
      </Typography>
      <Button variant='contained' color='secondary' component={Link} to='/'>
        Go to the main page
      </Button>
    </>
  )
}
