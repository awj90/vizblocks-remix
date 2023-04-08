import * as React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { GRAPH_TYPES } from '~/utils/types'

interface Props {
  availableGraphTypes: GRAPH_TYPES[]
  graphType: GRAPH_TYPES | undefined
  setGraphType: React.Dispatch<React.SetStateAction<GRAPH_TYPES | undefined>>
}

export default function DropDown({ availableGraphTypes, graphType, setGraphType }: Props) {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel sx={{ color: 'black' }}>Filter by Graph Types</InputLabel>
      <Select
        value={graphType}
        label='Filter by Graph Types'
        onChange={e => {
          setGraphType(e.target.value as GRAPH_TYPES)
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
