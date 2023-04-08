import * as React from 'react'
import { HeatmapTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// initial values for rows based on column template defined in app/utils/graphInitialData.ts

function Heatmap() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.heatmap

  // define template for column headers
  // https://mui.com/components/data-grid/columns/#column-definitions
  const columns: GridColumns = React.useMemo(
    () => [
      {
        field: 'xval',
        headerName: 'X Label',
        width: 120,
        editable: true,
      },
      { field: 'yval', headerName: 'Y Label', width: 120, editable: true },
      { field: 'value', headerName: 'Value', width: 120, type: 'number', editable: true },
    ],
    [],
  )

  React.useEffect(() => {
    setSelectedGraph(GRAPH_TYPES.heatmap)
    setColumnTemplate(columns)
  }, [columns, setColumnTemplate, setSelectedGraph])

  return (
    <>
      <HeatmapTemplate data={data} title={title} />
    </>
  )
}

export default Heatmap
