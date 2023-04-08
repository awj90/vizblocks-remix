import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { SavedGraphData } from '~/utils/types'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}))

interface Props {
  value: string | null | undefined
  setValue: React.Dispatch<React.SetStateAction<string | null | undefined>>
  data: SavedGraphData[]
}

export default function SearchBar({ value, setValue, data }: Props) {
  const options = data.map(option => option.graph_data.profile.firstName ?? '')
  const uniqueOptions = [...new Set(options)]

  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      value={value}
      onChange={(event: any, newValue?: string | null) => {
        setValue(newValue)
      }}
      options={uniqueOptions}
      renderInput={params => (
        <StyledTextField
          {...params}
          label='Search by user name'
          InputProps={{
            ...params.InputProps,
          }}
          sx={{ width: 500 }}
        />
      )}
      sx={{ mb: 4 }}
    />
  )
}
