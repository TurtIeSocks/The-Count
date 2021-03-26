import React, { useState } from 'react'
import {
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import useStyles from '../../assets/mui/styling'

const AdvancedSearch = ({ onSubmit, filters }) => {
  const classes = useStyles()
  const [values, setValues] = useState(filters)
  const [accordion, setAccordion] = useState(false)

  const handleChange = (event) => {
    if (event.target.name === 'cp') {
      setValues({
        ...values,
        [event.target.name]: parseFloat(event.target.value),
      })
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleAccordion = () => {
    setAccordion(!accordion)
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(values)
  }

  const sliders = [
    {
      name: 'Level', shortName: 'level', min: 1, max: 50,
    },
    {
      name: 'Attack', shortName: 'atk', min: 1, max: 15,
    },
    {
      name: 'Defense', shortName: 'def', min: 1, max: 15,
    },
    {
      name: 'Stamina', shortName: 'sta', min: 1, max: 15,
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
      <Grid item xs={10} sm={11}>
        <form onSubmit={handleSubmit}>
          <TextField
            color="secondary"
            name="cp"
            required
            value={values.cp}
            onChange={handleChange}
            label="Enter Desired CP..."
            type="number"
            variant="filled"
            fullWidth
          />
        </form>
      </Grid>
      <Grid item xs={2} sm={1}>
        <IconButton onClick={handleSubmit} color="secondary" variant="contained">
          <SearchIcon />
        </IconButton>
      </Grid>
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
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  )
}

export default AdvancedSearch
