/* eslint-disable no-param-reassign */
import React from 'react'
import { Typography, Slider } from '@material-ui/core'
import useStyles from '../../assets/mui/styling'

const SliderTile = ({
  name, shortName, values, min, max, handleChange, color,
}) => {
  const classes = useStyles()

  const width = shortName === 'iv' ? '80%' : '60%'

  return (
    <>
      <Typography gutterBottom>
        {name} {values[0]} - {values[1]}
      </Typography>
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
        style={{ width }}
        valueLabelDisplay="auto"
      />
    </>
  )
}

export default SliderTile
