'use client'

import * as React from 'react'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import Search from './Search'

import { MULTI_SELECT, SLIDERS, SWITCHES } from '../lib/constants'
import { useStorage } from '../lib/store'

const AdvancedOptions = () => (
  <Grid2 container>
    {SLIDERS.map((each) => (
      <SliderTile key={each.name} {...each} />
    ))}
    {MULTI_SELECT.map((each) => (
      <MultiSelect key={each} name={each} />
    ))}
    {SWITCHES.map((each) => (
      <FilterSwitch key={each} name={each} />
    ))}
  </Grid2>
)

const MobileView = () => {
  const advExpanded = useStorage((s) => s.advExpanded)
  return (
    <Box display={{ xs: 'block', sm: 'none' }}>
      <Accordion
        expanded={advExpanded}
        onChange={() =>
          useStorage.setState((s) => ({ advExpanded: !s.advExpanded }))
        }
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
          <Typography>Advanced Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdvancedOptions />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

const DesktopView = () => (
  <Box display={{ xs: 'none', sm: 'block' }} pt={4}>
    <AdvancedOptions />
  </Box>
)

const AdvancedSearch = React.memo(
  () => (
    <Grid2 className="layout" xs={12} sm={6} p={2}>
      <Search />
      <MobileView />
      <DesktopView />
    </Grid2>
  ),
  () => true,
)

AdvancedSearch.displayName = 'AdvancedSearch'

export default AdvancedSearch
