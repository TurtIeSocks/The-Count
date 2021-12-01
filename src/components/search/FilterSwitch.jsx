import React from 'react'
import {
  FormGroup, Grid, FormControlLabel, Switch,
} from '@material-ui/core'

const FilterSwitch = ({ name, filters, onSubmit }) => (
  <Grid item xs={4}>
    <FormGroup row>
      <FormControlLabel
        control={(
          <Switch
            checked={filters[name]}
            onChange={(e) => onSubmit({ ...filters, [e.target.name]: e.target.checked })}
            name={name}
          />
          )}
        label={name}
        labelPlacement="bottom"
      />
    </FormGroup>
  </Grid>
)

export default FilterSwitch
