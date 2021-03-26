import React from 'react'
import {
  FormGroup, Grid, FormControlLabel, Switch,
} from '@material-ui/core'

const FilterSwitch = ({ name, values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  return (
    <Grid item xs={3}>
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={values[name.toLowerCase()]}
              onChange={handleChange}
              name={name.toLowerCase()}
            />
          )}
          label={name}
          labelPlacement="bottom"
        />
      </FormGroup>
    </Grid>
  )
}

export default FilterSwitch
