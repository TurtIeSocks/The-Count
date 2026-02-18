import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { capitalize } from '@mui/material'

import { SWITCHES } from '@lib/constants'
import { useStorage } from '@lib/store'

interface Props {
  name: (typeof SWITCHES)[number]
}

export const FilterSwitch = ({ name }: Props) => {
  const value = useStorage((s) => !!s.filters[name])
  return (
    <Grid size={4}>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={(e) =>
              useStorage.setState((state) => ({
                filters: { ...state.filters, [name]: e.target.checked },
              }))
            }
            name={name}
          />
        }
        label={capitalize(name)}
        labelPlacement="bottom"
      />
    </Grid>
  )
}
