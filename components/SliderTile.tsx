/* eslint-disable no-param-reassign */
import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { useStorage } from '../lib/store'
import { SliderProps } from '../assets/types'

export default React.memo(
  ({ name, shortName, min, max }: SliderProps) => {
    const values = useStorage((s) => s.filters[shortName])
    const [local, setLocal] = React.useState(values)
    React.useEffect(() => setLocal(values), [values])
    return (
      <Grid2 xs={shortName === 'iv' ? 12 : 6} textAlign="center">
        <Typography gutterBottom>
          {name} {local[0]} - {local[1]}
        </Typography>
        <Slider
          name={shortName}
          min={min}
          max={max}
          color="secondary"
          value={local}
          onChange={(_, newValue) => {
            if (Array.isArray(newValue)) {
              setLocal(newValue)
            }
          }}
          onChangeCommitted={(_, newValue) => {
            if (Array.isArray(newValue)) {
              useStorage.setState((state) => ({
                filters: { ...state.filters, [shortName]: newValue },
              }))
            }
          }}
          style={{ width: shortName === 'iv' ? '90%' : '80%' }}
          valueLabelDisplay="auto"
        />
      </Grid2>
    )
  },
  (prev, next) => prev.name === next.name,
)
