import type { GridPreProcessEditCellProps } from '@mui/x-data-grid'
import toast from 'react-hot-toast'

export const checkDuplicates = (data: Record<string, any>, params: GridPreProcessEditCellProps, fieldName: string) => {
  const id = params.id
  const value = params.props.value
  const xValuesArr: string[] = Object.values(data)
    .filter(row => row.id !== id)
    .map(row => row[fieldName])
  const hasError = xValuesArr.filter(v => v === value).length > 0
  if (hasError) toast.error('Please enter a unique value!')
  return hasError
}
