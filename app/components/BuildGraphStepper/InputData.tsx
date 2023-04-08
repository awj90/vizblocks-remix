import * as React from 'react'
import * as XLSX from 'xlsx'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { GridCellEditCommitParams, GridCellValue, GridRowsProp, GridSelectionModel } from '@mui/x-data-grid'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGraphData } from '~/utils/graphDataContext'
import toast from 'react-hot-toast'
import { objectToCsvString, handleDownloadCsv } from './utils'

interface InputDataProps {}

const acceptedFileTypes = ['.csv', '.xls', '.xlsx']

const InputData = ({}: InputDataProps) => {
  // Editable DataGrid
  // https://mui.com/components/data-grid/editing/
  const { graphData, graphDispatch, selectedGraph, columnTemplate: columns } = useGraphData()
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const rows = graphData[selectedGraph]
  const setRows = React.useCallback((data: GridRowsProp) => graphDispatch({ type: selectedGraph, data }), [graphDispatch, selectedGraph])

  const handleCellEditCommit = React.useCallback(
    (params: GridCellEditCommitParams) => {
      const updatedRow = {
        id: params.id,
        [params.field]: params.value,
      }

      const newRows = rows.map(row => (row.id === params.id ? { ...row, ...updatedRow } : row))
      setRows(newRows)
    },
    [rows, setRows],
  )

  const handleSelectionModel = (ids: GridSelectionModel) => {
    setSelectionModel(ids)
  }

  const handleAddRow = () => {
    const id = rows.length + 1
    const newRows = [...rows, { id }]
    setRows(newRows)
  }

  const handleDeleteRow = () => {
    const selectedIDs = new Set(selectionModel)
    const newRows = rows.filter(row => !selectedIDs.has(row.id))
    setRows(newRows)
  }

  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json: { [key: string]: any }[] = XLSX.utils.sheet_to_json(worksheet)

        const isValid = checkFileValidity(json)

        if (isValid) {
          setErrorMessage('')
          setRows(json)
        } else {
          // reset input value
          ;(document.getElementById('upload') as HTMLInputElement).value = ''
          toast.error(`Upload failed!`)
        }
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }

  // TODO: check csv template
  const checkFileValidity = (data: { [key: string]: any }[]) => {
    if (data.length < 1) return true

    // const propertiesToCheck = ['id', 'xval', 'yval']
    // const isHeaderValid = (row: any) => propertiesToCheck.every(header => header in row)

    // for (let row of data) {
    //   if (!isHeaderValid(row)) {
    //     setErrorMessage(`Did you modify the headers (first row) OR some row values are missing?`)
    //     return false
    //   }

    //   if (typeof row.yval !== 'number') {
    //     setErrorMessage(`The column "yval" contains non-numeric values.`)
    //     return false
    //   }
    // }

    return true
  }

  const csvString = objectToCsvString(rows)
  const handleDownloadTemplate = () => handleDownloadCsv(csvString, selectedGraph)

  const CustomToolBar = () => {
    return (
      <GridToolbarContainer>
        <Button onClick={handleAddRow} sx={{ fontSize: '13px' }} startIcon={<AddCircleIcon />}>
          Add
        </Button>
        <Button onClick={handleDeleteRow} sx={{ fontSize: '13px' }} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Input data
      </Typography>

      {errorMessage !== '' && (
        <Typography variant='body1' color='error' textAlign='center'>
          Error: {errorMessage}
        </Typography>
      )}

      <Box sx={{ height: 400, width: 1, [`& .MuiCheckbox-root`]: { color: 'inherit' } }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellEditCommit={handleCellEditCommit}
          hideFooter
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={handleSelectionModel}
          components={{
            Toolbar: CustomToolBar,
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', m: 1 }}>
        <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
          Note: You can upload a .csv file instead. Get our csv template by clicking on download template below.
        </Typography>

        <div>
          <Button component='label' htmlFor='upload'>
            Upload File
            <input type='file' name='upload' id='upload' accept={acceptedFileTypes.join(',')} onChange={readUploadFile} hidden />
          </Button>
          <Button onClick={handleDownloadTemplate}>Download Template</Button>
        </div>
      </Box>
    </>
  )
}

export default InputData
