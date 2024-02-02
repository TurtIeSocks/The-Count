import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { useStorage } from '@lib/store'
import { SliderProps } from '@lib/types'

const IV_MARK = 100 / 45
const roundToOne = (num: number) => +num.toFixed(1)
const MARKS = [
  { value: 0, label: '0 Star' },
  { value: 51.1, label: '1 Star' },
  { value: 66.7, label: '2 Star' },
  { value: 82.2, label: '3 Star' },
  { value: 100, label: '4 Star' },
]

const SliderTile = React.memo(
  ({ name, shortName, min, max }: SliderProps) => {
    const values = useStorage((s) => s.filters[shortName])
    const [local, setLocal] = React.useState(values)
    React.useEffect(() => setLocal(values), [values])
    return (
      <Grid2 xs={shortName === 'iv' ? 12 : 6}>
        <Typography gutterBottom>
          {name} {local.map(roundToOne).join(' - ')}
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
                filters: {
                  ...state.filters,
                  [shortName]: newValue.map(roundToOne),
                },
              }))
            }
          }}
          step={shortName === 'iv' ? IV_MARK : 1}
          marks={shortName === 'iv' ? MARKS : undefined}
          sx={{ width: shortName === 'iv' ? '92.5%' : '85%' }}
          valueLabelDisplay="auto"
          valueLabelFormat={roundToOne}
        />
      </Grid2>
    )
  },
  (prev, next) => prev.name === next.name,
)

SliderTile.displayName = 'SliderTile'

export default SliderTile
