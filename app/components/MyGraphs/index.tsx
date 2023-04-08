import * as React from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

import GraphCard from './GraphCard'
import useWindowSize from '~/hooks/useWindowSize'
import Box from '@mui/material/Box'

import SearchBar from './SearchBar'
import { GRAPH_TYPES, SavedGraphData } from '~/utils/types'
import FilterDropDown from './FilterDropDown'
import { CircularProgress, Typography } from '@mui/material'

interface Props {
  graphData?: SavedGraphData[]
  handleDelete: (id: string) => Promise<void>
}

type FilterGraphTypes = GRAPH_TYPES | 'all'

export default function MyGraphs({ graphData, handleDelete }: Props) {
  const [name, setName] = React.useState<string | null | undefined>(null)
  const [graphType, setGraphType] = React.useState<FilterGraphTypes>('all')
  const { width = 0 } = useWindowSize()

  const getVisibleSlides = () => {
    if (width > 2400) return 5
    if (width > 2000) return 4
    if (width > 1600) return 3
    if (width > 1200) return 2
    return 1
  }

  const getFilteredData = () => {
    return graphData?.filter(data => {
      if (name && graphType !== 'all') {
        return data.graph_data.profile.firstName === name && data.graph_type === graphType
      } else if (name) {
        return data.graph_data.profile.firstName === name
      } else if (graphType !== 'all') {
        return data.graph_type === graphType
      } else {
        return true
      }
    })
  }

  const visibleSlides = getVisibleSlides()
  const filteredData = getFilteredData()
  const totalSlides = filteredData?.length
  const availableGraphTypes: FilterGraphTypes[] = ['all', ...new Set(graphData?.map(data => data.graph_type))]

  if (!graphData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {filteredData?.length === 0 ? (
        <Typography textAlign={'center'}>No works added yet</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchBar value={name} setValue={setName} data={graphData} />
            <FilterDropDown availableGraphTypes={availableGraphTypes} graphType={graphType} setGraphType={setGraphType} />
          </Box>

          <CarouselProvider
            naturalSlideWidth={350}
            naturalSlideHeight={350}
            step={visibleSlides}
            dragStep={visibleSlides}
            visibleSlides={visibleSlides}
            totalSlides={totalSlides ?? 0}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 30px' }}>
              <ButtonBack style={{ all: 'unset', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowBackIosIcon />
              </ButtonBack>
              <Slider style={{ maxHeight: 400 }}>
                {filteredData?.map((data, index) => {
                  return (
                    <Slide key={data.id} index={index}>
                      <GraphCard data={data} handleDelete={handleDelete} />
                    </Slide>
                  )
                })}
              </Slider>
              <ButtonNext style={{ all: 'unset', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowForwardIosIcon />
              </ButtonNext>
            </div>
          </CarouselProvider>
        </>
      )}
    </Box>
  )
}
