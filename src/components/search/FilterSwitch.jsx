import React from 'react'
import {
  FormGroup, Grid, FormControlLabel, Switch,
} from '@material-ui/core'

const FilterSwitch = ({ name, filters, onSubmit }) => (
  <Grid item xs={3}>
    <FormGroup row>
      <FormControlLabel
        control={(
          <Switch
            checked={filters[name.toLowerCase()]}
            onChange={(e) => onSubmit({ ...filters, [e.target.name]: e.target.checked })}
            name={name.toLowerCase()}
          />
          )}
        label={name}
        labelPlacement="bottom"
      />
    </FormGroup>
  </Grid>
)

export default FilterSwitch
