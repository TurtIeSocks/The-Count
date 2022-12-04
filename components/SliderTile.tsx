/* eslint-disable no-param-reassign */
import { useState } from 'react'
import { Typography, Slider } from '@mui/material'

interface Props {
  name: string
  shortName: string
  values: number[]
  min: number
  max: number
  handleChange: (name: string, newValues: number[]) => void
  color: 'primary' | 'secondary'
}

export default function SliderTile({
  name,
  shortName,
  values,
  min,
  max,
  handleChange,
  color,
}: Props) {
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
        onChange={(_, newValue) => {
          if (Array.isArray(newValue)) {
            setLocal(newValue)
          }
        }}
        onChangeCommitted={(_, newValue) => {
          if (Array.isArray(newValue)) {
            handleChange(shortName, newValue)
          }
        }}
        style={{ width }}
        valueLabelDisplay="auto"
      />
    </>
  )
}
