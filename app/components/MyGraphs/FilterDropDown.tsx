import * as React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { GRAPH_TYPES } from '~/utils/types'
import { styled } from '@mui/material/styles'

type FilterGraphTypes = GRAPH_TYPES | 'all'
interface Props {
  availableGraphTypes: FilterGraphTypes[]
  graphType: FilterGraphTypes | undefined
  setGraphType: React.Dispatch<React.SetStateAction<FilterGraphTypes>>
}

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root ': {
    color: theme.palette.text.primary,
  },
}))

export default function FilterDropDown({ availableGraphTypes, graphType, setGraphType }: Props) {
  return (
    <FormControl sx={{ width: 200 }}>
      <StyledInputLabel sx={{ color: 'black' }}>Filter by Graph Types</StyledInputLabel>
      <Select
        value={graphType}
        label='Filter by Graph Types'
        onChange={e => {
          setGraphType(e.target.value as FilterGraphTypes)
        }}
      >
        {availableGraphTypes.map((graphType, index) => {
          return (
            <MenuItem key={index} value={graphType}>
              {graphType}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
