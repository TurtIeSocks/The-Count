import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'

import SliderTile from './SliderTile'
import useStyles from '../../assets/mui/styling'

const AdvancedSearch = ({ onSubmit, filters }) => {
  const classes = useStyles()
  const [values, setValues] = useState(filters)

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

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(values)
  }

  const sliders = [
    {
      name: 'IV Range', shortName: 'iv', min: 0, max: 100,
    },
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
  ].map(each => (
    <Grid item key={each.name} xs={6} lg={12}>
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
      <Grid item xs={11}>
        <form onSubmit={handleSubmit}>
          <TextField
            color="secondary"
            name="cp"
            required
            value={values.cp}
            onChange={handleChange}
            label="Enter Desired CP"
            type="number"
            variant="filled"
            fullWidth
            InputProps={{
              className: classes.white,
            }}
          />
        </form>
      </Grid>
      {sliders}
      <Grid item xs={6} lg={12}>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          <Typography
            className={classes.successButton}
          >
            Search
          </Typography>
        </Button>
      </Grid>
    </>
  )
}

export default AdvancedSearch
