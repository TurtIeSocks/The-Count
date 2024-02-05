import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'

import { useStorage } from '@lib/store'
import { SliderProps } from '@lib/types'

const IV_MARK = 100 / 45
const roundToOne = (num: number) => +num.toFixed(1)

const Star = ({ children }: { children: string }) => (
  <Grid2 container flexWrap="nowrap">
    {children}
    <StarIcon fontSize="small" />
  </Grid2>
)
const MARKS = [
  { value: 0, label: <Star>0</Star> },
  { value: 51.1, label: <Star>1</Star> },
  { value: 66.7, label: <Star>2</Star> },
  { value: 82.2, label: <Star>3</Star> },
  { value: 100, label: <Star>4</Star> },
]

export const SliderTile = React.memo(
  ({ name, shortName, min, max }: SliderProps) => {
    const values = useStorage((s) => s.filters[shortName])
    const [local, setLocal] = React.useState(values)
    const isIv = shortName === 'iv'
    React.useEffect(() => setLocal(values), [values])
    return (
      <Grid2 xs={12} md={isIv ? 12 : 6}>
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
          sx={{
            width: { xs: '85%', md: shortName === 'iv' ? '92.5%' : '85%' },
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={roundToOne}
        />
      </Grid2>
    )
  },
  (prev, next) => prev.name === next.name,
)

SliderTile.displayName = 'SliderTile'
