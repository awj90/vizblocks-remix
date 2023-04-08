import * as React from 'react'
import { HistogramTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'
import { checkDuplicates } from '~/utils/graphUtils'

// initial values for rows based on column template defined in app/utils/graphInitialData.ts

function Histogram() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.histogram

  // define template for column headers
  // https://mui.com/components/data-grid/columns/#column-definitions
  const columns: GridColumns = React.useMemo(
    () => [
      {
        field: 'xval',
        headerName: 'Bins',
        width: 180,
        editable: true,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = checkDuplicates(data, params, 'xval')
          return { ...params.props, error: hasError }
        },
      },
      { field: 'yval', headerName: 'Y Values', width: 180, type: 'number', editable: true },
    ],
    [data],
  )

  React.useEffect(() => {
    setColumnTemplate(columns)
    setSelectedGraph(GRAPH_TYPES.histogram)
  }, [columns, setColumnTemplate, setSelectedGraph])

  return (
    <>
      <HistogramTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default Histogram
