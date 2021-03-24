/* eslint-disable no-param-reassign */
import React from 'react'
import { Grid, Typography, Slider } from '@material-ui/core'
import useStyles from '../../assets/mui/styling'

const SliderTile = ({
  name, shortName, values, min, max, handleChange, color,
}) => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={12}>
        <Typography gutterBottom>
          {name} {values[0]} - {values[1]}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Slider
          name={shortName}
          min={min}
          max={max}
          color={color}
          className={classes.slider}
          value={values}
          onChange={(event, newValue) => {
            event.target.name = shortName
            event.target.value = newValue
            handleChange(event)
          }}
          valueLabelDisplay="auto"
        />
      </Grid>
    </>
  )
}

export default SliderTile
