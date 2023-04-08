import { styled, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import type { ApiError } from '@supabase/supabase-js'
import * as React from 'react'
import toast from 'react-hot-toast'
import { supabaseAdmin } from '~/supabase.server'
import { magicLinkStrategy } from '~/utils/auth.server'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

type ActionData = {
  success?: { message: string }
  error: ApiError | null
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.clone().formData()
  const id = form?.get('userId')
  const firstName = form?.get('firstName')
  const lastName = form?.get('lastName')
  const email = form?.get('email')
  const role = form?.get('role')

  if (!firstName) return json({ error: { message: 'First name is required' } }, 400)
  if (typeof firstName !== 'string') return json({ error: { message: 'First name must be a string' } }, 400)
  if (firstName.length < 3) return json({ error: { message: 'First name should be 3 or more characters long' } })

  if (!lastName) return json({ error: { message: 'Last name is required' } }, 400)
  if (typeof lastName !== 'string') return json({ error: { message: 'Last name must be a string' } }, 400)

  const { data, error } = await supabaseAdmin.from('profiles').update({ firstName, lastName, email, role }).eq('id', id)
  console.log('>>>', data, error)
  if (error) return json({ error: { message: error.message } }, 400)
  return json({ success: { message: 'Successfully updated!' } })
}

type LoaderData = { userId?: string; firstName?: string; lastName?: string; email?: string; role?: string }

export const loader: LoaderFunction = async ({ request }) => {
  const session = await magicLinkStrategy.checkSession(request)
  const { data, error } = await supabaseAdmin.from('profiles').select().eq('id', session?.user?.id)
  const profile = {
    userId: session?.user?.id,
    firstName: data?.[0]?.firstName ?? '',
    lastName: data?.[0]?.lastName ?? '',
    email: session?.user?.email,
    role: data?.[0]?.role,
  }

  return json<LoaderData>(profile)
}

export default function Profile() {
  const transition = useTransition()
  const loading = transition.state === 'submitting'
  const { success, error } = useActionData<ActionData>() || {}
  const { userId, firstName, lastName, email, role: currentRole } = useLoaderData<LoaderData>()
  const [role, setRole] = React.useState(currentRole)

  React.useEffect(() => {
    if (success) {
      toast.success(success.message)
    }
  }, [success])

  return (
    <Form
      method='post'
      style={{
        position: 'relative',
        top: '25%',
        width: '50%',
        background: 'white',
        borderRadius: 8,
        padding: 32,
        margin: 'auto',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom textAlign={'center'}>
        Edit Profile
      </Typography>
      {error && (
        <Typography variant='subtitle1' color={'#ff7300'} textAlign='center'>
          {error.message}
        </Typography>
      )}

      <FormGroup sx={{ alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={role === 'educator'}
              onChange={e => {
                setRole(e.target.checked ? 'educator' : 'student')
              }}
            />
          }
          label='I am an educator'
        />
      </FormGroup>
      <input type='hidden' name='userId' value={userId} />
      <input type='hidden' name='role' value={role} />
      <StyledTextField
        label='First Name'
        type='text'
        name='firstName'
        fullWidth
        margin='normal'
        defaultValue={firstName}
        required
        inputProps={{ maxLength: 50 }}
      />
      <StyledTextField
        label='Last Name'
        type='text'
        name='lastName'
        fullWidth
        margin='normal'
        defaultValue={lastName}
        required
        inputProps={{ maxLength: 50 }}
      />
      <StyledTextField
        label='Email'
        type='email'
        name='email'
        fullWidth
        margin='normal'
        defaultValue={email}
        inputProps={{ readOnly: true }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type='submit'
          size='large'
          variant='contained'
          className='button'
          sx={{ mt: 2, height: 45, width: '70%' }}
          disabled={loading}
        >
          {loading ? 'Updating... ' : 'Update'}
        </Button>
      </Box>
    </Form>
  )
}
