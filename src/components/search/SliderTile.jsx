/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { Typography, Slider } from '@material-ui/core'

import useStyles from '@hooks/useStyles'

const SliderTile = ({
  name, shortName, values, min, max, handleChange, color,
}) => {
  const classes = useStyles()
  const [local, setLocal] = useState(values)
  const width = shortName === 'iv' ? '80%' : '60%'

  return (
    <>
      <Typography gutterBottom>
        {name} {local[0]} - {local[1]}
      </Typography>
      <Slider
        name={shortName}
        min={min}
        max={max}
        color={color}
        className={classes.slider}
        value={local}
        onChange={(event, newValue) => {
          setLocal(newValue)
        }}
        onChangeCommitted={(event, newValue) => {
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
