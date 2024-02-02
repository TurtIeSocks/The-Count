import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import Search from './Search'

import { MULTI_SELECT, SLIDERS, SWITCHES } from '../lib/constants'
import { useStorage } from '../lib/store'
import styles from '../styles.module.css'

const AdvancedOptions = () => (
  <Grid2 container pt={4}>
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
    <IconButton
      sx={{ display: { xs: 'block', sm: 'none' }, pr: 0 }}
      onClick={() => {
        useStorage.setState({ advExpanded: !advExpanded })
      }}
    >
      <ExpandMoreIcon
        className={advExpanded ? styles.expanded : styles.collapsed}
      />
    </IconButton>
  )
}

const Expanded = () => {
  const advExpanded = useStorage((s) => s.advExpanded)
  return (
    <Collapse in={advExpanded} sx={{ display: { xs: 'block', sm: 'none' } }}>
      <AdvancedOptions />
    </Collapse>
  )
}

const DesktopView = () => (
  <Box display={{ xs: 'none', sm: 'block' }} pt={4}>
    <AdvancedOptions />
  </Box>
)

const AdvancedSearch = React.memo(
  () => (
    <Grid2 container xs={12} sm={6} px={2}>
      <Search />
      <MobileView />
      <DesktopView />
      <Expanded />
    </Grid2>
  ),
  () => true,
)

AdvancedSearch.displayName = 'AdvancedSearch'

export default AdvancedSearch
