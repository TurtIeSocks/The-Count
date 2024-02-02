import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { MULTI_SELECT, SLIDERS, SWITCHES } from '@lib/constants'
import { useStorage } from '@lib/store'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import Search from './Search'
import PokemonAC from './PokemonAC'
import styles from '../styles.module.css'

const MOBILE_ONLY = { display: { xs: 'block', sm: 'none' } }
const DESKTOP_ONLY = { xs: 'none', sm: 'block' }

const AdvancedOptions = () => (
  <Grid2 container columnSpacing={1}>
    <PokemonAC />
    {MULTI_SELECT.map((each) => (
      <MultiSelect key={each} name={each} />
    ))}
    <Grid2 component={Divider} xs={12} mb={2} mt={1} />
    {SLIDERS.map((each) => (
      <SliderTile key={each.name} {...each} />
    ))}
    <Grid2 component={Divider} xs={12} mb={2} mt={1} />
    {SWITCHES.map((each) => (
      <FilterSwitch key={each} name={each} />
    ))}
  </Grid2>
)

const MobileView = () => {
  const advExpanded = useStorage((s) => s.advExpanded)
  return (
    <IconButton
      sx={MOBILE_ONLY}
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
    <Collapse in={advExpanded} sx={MOBILE_ONLY}>
      <AdvancedOptions />
      <Grid2 component={Divider} xs={12} my={2} />
    </Collapse>
  )
}

const DesktopView = () => (
  <Box display={DESKTOP_ONLY}>
    <AdvancedOptions />
  </Box>
)

const AdvancedSearch = React.memo(
  () => (
    <Grid2 container xs={12} sm={5} md={6} px={2} xl={4}>
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
