import * as React from 'react'
import { Typography } from '@mui/material'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts'
import { useTheme } from '~/utils/theme'

interface ScatterPlotTemplateProps {
  data: any
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function ScatterPlotTemplate({ data, title, xlabel, ylabel, name }: ScatterPlotTemplateProps) {
  const { mode } = useTheme()

  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='99%' height='100%'>
        <ScatterChart
          width={500}
          height={300}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey='xval' type='number' label={{ value: xlabel, position: 'bottom', fill: mode === 'light' ? '#000' : '#fff' }} />
          <YAxis
            dataKey='yval'
            type='number'
            label={{ value: ylabel, angle: -90, position: 'left', fill: mode === 'light' ? '#000' : '#fff' }}
          />
          {/* Dot Size https://stackoverflow.com/questions/68437581/how-to-customize-recharts-scatter-circle-size */}
          <ZAxis range={[250, 250]} />
          <Tooltip labelStyle={{ color: 'black' }} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name={name} data={data} fill='#82ca9d' />
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
