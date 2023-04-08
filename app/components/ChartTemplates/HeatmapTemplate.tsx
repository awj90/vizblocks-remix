import * as React from 'react'
import { Typography } from '@mui/material'
import { ResponsiveContainer } from 'recharts'
import { HeatMapGrid } from 'react-grid-heatmap'
import { useTheme } from '~/utils/theme'

interface HeatmapTemplateProps {
  data: any
  title?: string
  xlabel?: string[] | number[]
  ylabel?: string[] | number[]
  xFontSize?: number
  yFontSize?: number
  cellFontSize?: number
  cellHeight?: number
}

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function HeatmapTemplate({ data, title, xFontSize = 16, yFontSize = 16, cellFontSize = 16, cellHeight = 60 }: HeatmapTemplateProps) {
  const { mode } = useTheme()

  const getLabel = (axis: 'x' | 'y') => {
    const set = new Set<string>()
    if (axis === 'x') data.forEach(({ xval }: { xval: number | string }) => set.add(`${xval}`))
    if (axis === 'y') data.forEach(({ yval }: { yval: number | string }) => set.add(`${yval}`))
    return [...set]
  }
  const formatData = (xlabel: string[], ylabel: string[]) => {
    const array = new Array(ylabel.length).fill(0).map(() => new Array(xlabel.length).fill(0))
    data.forEach(({ xval, yval, value }: { xval: number | string; yval: number | string; value: number }) => {
      const yIndex = ylabel.indexOf(`${yval}`)
      const xIndex = xlabel.indexOf(`${xval}`)
      array[yIndex][xIndex] = value
    })
    return array
  }

  const xlabel = getLabel('x')
  const ylabel = getLabel('y')
  const finalData = formatData(xlabel, ylabel)
  // console.log(formatData(xlabel, ylabel))
  // const xlabel = new Array(5).fill(0).map((_, i) => `${i}`)
  // const ylabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  // const finalData = new Array(ylabel.length)
  //   .fill(0)
  //   .map(() => new Array(xlabel.length).fill(0).map(() => Math.floor(Math.random() * 5 + 5)))
  // console.log(data)

  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center', marginBottom: '16px' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='99%' height='100%'>
        <HeatMapGrid
          data={finalData}
          xLabels={xlabel}
          yLabels={ylabel}
          // Reder cell with tooltip
          cellRender={(x, y, value) => <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>}
          xLabelsStyle={index => ({
            color: '#777',
            fontSize: `${xFontSize}px`,
          })}
          yLabelsStyle={() => ({
            fontSize: `${yFontSize}px`,
            textTransform: 'uppercase',
            color: '#777',
            marginRight: '4px',
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `rgb(12, 160, 44, ${ratio})`,
            fontSize: `${cellFontSize}px`,
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          })}
          cellHeight={`${cellHeight}px`}
          xLabelsPos='bottom'
          // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
          // yLabelsPos="right"
          //square
        />
      </ResponsiveContainer>
    </>
  )
}
