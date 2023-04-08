import * as React from 'react'
import { Typography } from '@mui/material'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '~/utils/theme'

interface PieChartTemplateProps {
  data: any
  title?: string
  xlabel?: string
  ylabel?: string
  name?: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#651378', '#cee000', '#e10007']

// set ResponsiveContainer width=99% to respond to window size changes
// see https://github.com/recharts/recharts/issues/172#issuecomment-307858843
export function PieChartTemplate({ data, title, xlabel, ylabel, name }: PieChartTemplateProps) {
  const { mode } = useTheme()

  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='99%' height='100%'>
        <PieChart
          width={500}
          height={300}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
        >
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={data}
            cx={'50%'}
            cy={'50%'}
            outerRadius={'80%'}
            // innerRadius={'50%'}
            fill='#82ca9d'
            label
          >
            {data.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign='top' height={36} />
          <Tooltip labelStyle={{ color: 'black' }} />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
