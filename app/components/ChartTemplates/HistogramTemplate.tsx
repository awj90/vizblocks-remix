import * as React from 'react'
import { Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '~/utils/theme'

interface HistogramTemplateProps {
  data: any
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function HistogramTemplate({ data, title, xlabel, ylabel, name }: HistogramTemplateProps) {
  const { mode } = useTheme()

  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='99%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
          barGap={0}
          barCategoryGap={0}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='xval'
            label={{ value: xlabel, position: 'bottom', fill: mode === 'light' ? '#000' : '#fff' }}
            scale='band'
            domain={['auto', 'auto']}
          />
          <YAxis
            label={{ value: ylabel, angle: -90, position: 'left', fill: mode === 'light' ? '#000' : '#fff' }}
            domain={['auto', 'auto']}
          />
          <Tooltip labelStyle={{ color: 'black' }} />
          <Bar type='monotone' dataKey='yval' name={name} fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
