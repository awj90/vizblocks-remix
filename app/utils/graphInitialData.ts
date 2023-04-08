import type { GridRowsProp } from '@mui/x-data-grid'
import type { GRAPH_TYPES } from '~/utils/types'

export const graphInitialData: { [key in GRAPH_TYPES]: GridRowsProp } = {
  barchart: [
    { id: 1, xval: 'Page A', yval: 4000 },
    { id: 2, xval: 'Page B', yval: 3000 },
    { id: 3, xval: 'Page C', yval: 2000 },
    { id: 4, xval: 'Page D', yval: 2780 },
    { id: 5, xval: 'Page E', yval: 1890 },
    { id: 6, xval: 'Page F', yval: 2390 },
    { id: 7, xval: 'Page G', yval: 3490 },
  ],
  dotplot: [
    { id: 1, xval: 'Page A', yval: 2 },
    { id: 2, xval: 'Page B', yval: 5 },
    { id: 3, xval: 'Page C', yval: 3 },
    { id: 4, xval: 'Page D', yval: 8 },
    { id: 5, xval: 'Page E', yval: 7 },
    { id: 6, xval: 'Page F', yval: 2 },
  ],
  heatmap: generateHeatMapData(),
  histogram: [
    { id: 1, xval: '18-24', yval: 13.38 },
    { id: 2, xval: '25-34', yval: 27.65 },
    { id: 3, xval: '35-44', yval: 18.45 },
    { id: 4, xval: '45-54', yval: 16.62 },
    { id: 5, xval: '55-64', yval: 13.42 },
    { id: 6, xval: '65+', yval: 10.48 },
  ],
  linechart: [
    { id: 1, xval: 'Page A', yval: 4000 },
    { id: 2, xval: 'Page B', yval: 3000 },
    { id: 3, xval: 'Page C', yval: 2000 },
    { id: 4, xval: 'Page D', yval: 2780 },
    { id: 5, xval: 'Page E', yval: 1890 },
    { id: 6, xval: 'Page F', yval: 2390 },
    { id: 7, xval: 'Page G', yval: 3490 },
  ],
  pictograph: [
    { id: 1, category: 'Car', value: 2 },
    { id: 2, category: 'Boat', value: 5 },
    { id: 3, category: 'Rocket', value: 3 },
    { id: 4, category: 'Plane', value: 8 },
  ],
  piechart: [
    { id: 1, name: 'Group A', value: 400 },
    { id: 2, name: 'Group B', value: 300 },
    { id: 3, name: 'Group C', value: 300 },
    { id: 4, name: 'Group D', value: 200 },
  ],
  scatterplot: [
    { id: 1, xval: 100, yval: 200 },
    { id: 2, xval: 120, yval: 100 },
    { id: 3, xval: 170, yval: 300 },
    { id: 4, xval: 140, yval: 250 },
    { id: 5, xval: 150, yval: 400 },
    { id: 6, xval: 110, yval: 280 },
  ],
}

function generateHeatMapData(): { id: number; xval: string | number; yval: string | number; value: number }[] {
  const yval = ['A', 'B', 'C', 'D']
  const xval = [0, 1, 2, 3, 4]
  let id = 1
  const array = []

  for (const y of yval) {
    for (const x of xval) {
      array.push({ id, xval: x, yval: y, value: Math.floor(Math.random() * 10) })
      id += 1
    }
  }
  return array
}
