import Grid2 from '@mui/material/Unstable_Grid2'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { capitalize } from '@mui/material'

import { SWITCHES } from '../lib/constants'
import { useStorage } from '../lib/store'

interface Props {
  name: (typeof SWITCHES)[number]
}

export default function FilterSwitch({ name }: Props) {
  const value = useStorage((s) => !!s.filters[name])
  return (
    <Grid2 xs={4}>
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
    </Grid2>
  )
}
