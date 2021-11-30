import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import useStyles from '../../hooks/useStyles'
import Search from './Search'

const AdvancedSearch = ({ onSubmit, filters }) => {
  const classes = useStyles()
  const [values, setValues] = useState(filters)
  const [accordion, setAccordion] = useState(false)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
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
    <Grid item key={each.name} xs={each.shortName === 'iv' ? 12 : 6}>
      <SliderTile
        name={each.name}
        shortName={each.shortName}
        min={each.min}
        max={each.max}
        handleChange={handleChange}
        values={values[each.shortName]}
        color="secondary"
      />
    </Grid>
  ))

  return (
    <>
      <Search onSubmit={onSubmit} filters={filters} />
      <Grid item xs={12}>
        <Accordion expanded={accordion} onChange={handleAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="secondary" />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
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
                  type={each}
                  values={values}
                  setValues={setValues}
                />
              ))}
              {['Forms', 'Megas', 'Legends', 'Mythics'].map(each => (
                <FilterSwitch
                  key={each}
                  name={each}
                  values={values}
                  setValues={setValues}
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
