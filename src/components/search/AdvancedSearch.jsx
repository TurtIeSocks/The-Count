import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useStyles from '@hooks/useStyles'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import Search from './Search'

const AdvancedSearch = ({ onSubmit, filters, isMobile }) => {
  const classes = useStyles()
  const [accordion, setAccordion] = useState(!isMobile)

  const handleChange = (event) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.value,
    }
    onSubmit(newFilters)
  }

  const handleAccordion = () => {
    setAccordion(!accordion)
  }

  const sliders = [
    {
      name: 'Level', shortName: 'level', min: 1, max: 55,
    },
    {
      name: 'Attack', shortName: 'atk', min: 0, max: 15,
    },
    {
      name: 'Defense', shortName: 'def', min: 0, max: 15,
    },
    {
      name: 'Stamina', shortName: 'sta', min: 0, max: 15,
    },
    {
      name: 'IV Range', shortName: 'iv', min: 0, max: 100,
    },
  ].map(each => (
    <Grid item key={each.name} xs={each.shortName === 'iv' ? 12 : 6} style={{ textAlign: 'center' }}>
      <SliderTile
        name={each.name}
        shortName={each.shortName}
        min={each.min}
        max={each.max}
        handleChange={handleChange}
        values={filters[each.shortName]}
        color="secondary"
      />
    </Grid>
  ))

  return (
    <>
      <Search onSubmit={onSubmit} filters={filters} isMobile={isMobile} />
      <Grid item xs={12}>
        <Accordion expanded={accordion} onChange={handleAccordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography className={classes.heading}>Advanced Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {sliders}
              {['Generations', 'Types'].map(each => (
                <MultiSelect
                  key={each}
                  name={each}
                  filters={filters}
                  onSubmit={onSubmit}
                />
              ))}
              {['Forms', 'Megas', 'Legends', 'Mythics'].map(each => (
                <FilterSwitch
                  key={each}
                  name={each}
                  filters={filters}
                  onSubmit={onSubmit}
                />
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  )
}

export default AdvancedSearch
