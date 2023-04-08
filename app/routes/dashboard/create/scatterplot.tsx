import * as React from 'react'
import { ScatterPlotTemplate } from '~/components/ChartTemplates'
import { useGraphData } from '~/utils/graphDataContext'
import type { GridColumns } from '@mui/x-data-grid'
import { GRAPH_TYPES } from '~/utils/types'

// initial values for rows based on column template defined in app/utils/graphInitialData.ts

function ScatterPlot() {
  const { graphData, setSelectedGraph, setColumnTemplate, parameters } = useGraphData()
  const { title, xlabel, ylabel, name } = parameters
  const data = graphData.scatterplot

  // define template for column headers
  // https://mui.com/components/data-grid/columns/#column-definitions
  const columns: GridColumns = React.useMemo(
    () => [
      { field: 'xval', headerName: 'X Value', width: 180, type: 'number', editable: true },
      { field: 'yval', headerName: 'Y Value', width: 180, type: 'number', editable: true },
    ],
    [],
  )

  React.useEffect(() => {
    setColumnTemplate(columns)
    setSelectedGraph(GRAPH_TYPES.scatterplot)
  }, [columns, setColumnTemplate, setSelectedGraph])

  return (
    <>
      <ScatterPlotTemplate data={data} title={title} xlabel={xlabel} ylabel={ylabel} name={name} />
    </>
  )
}

export default ScatterPlot
