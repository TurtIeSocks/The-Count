import {
  FormGroup,
  Grid,
  FormControlLabel,
  Switch,
  capitalize,
} from '@mui/material'
import type { Filters } from '../assets/types'

interface Props {
  name: keyof Filters
  filters: Filters
  onSubmit: (filters: Filters) => void
}

export default function FilterSwitch({ name, filters, onSubmit }: Props) {
  return (
    <Grid item xs={4}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={!!filters[name]}
              onChange={(e) =>
                onSubmit({ ...filters, [e.target.name]: e.target.checked })
              }
              name={name}
            />
          }
          label={capitalize(name)}
          labelPlacement="bottom"
        />
      </FormGroup>
    </Grid>
  )
}
