/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { Typography, Slider } from '@material-ui/core'

const SliderTile = ({
  name, shortName, values, min, max, handleChange, color,
}) => {
  const [local, setLocal] = useState(values)
  const width = shortName === 'iv' ? '90%' : '80%'

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
        value={local}
        onChange={(event, newValue) => {
          setLocal(newValue)
        }}
        onChangeCommitted={(e, newValue) => handleChange(shortName, newValue)}
        style={{ width }}
        valueLabelDisplay="auto"
      />
    </>
  )
}

export default SliderTile
