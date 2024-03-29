import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import { capitalize } from '@mui/material/utils'

import { MULTI_SELECT } from '@lib/constants'
import { useStorage } from '@lib/store'

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}

interface Props {
  name: (typeof MULTI_SELECT)[number]
}

export const MultiSelect = React.memo(
  ({ name }: Props) => {
    const filters = useStorage((s) => s.filters[name])
    const selected = React.useMemo(
      () => Object.keys(filters).filter((k) => filters[k]),
      [filters],
    )
    const handleChange: SelectProps['onChange'] = ({ target }) => {
      const value = Array.isArray(target.value)
        ? target.value
        : (target.value as string).split(',')
      useStorage.setState((state) => ({
        filters: {
          ...state.filters,
          [name]: {
            ...Object.fromEntries(
              Object.keys(state.filters[name]).map((k) => [k, false]),
            ),
            ...Object.fromEntries(value.map((v) => [v, true])),
          },
        },
      }))
    }
    return (
      <Grid2 xs={12} md={6} py={{ xs: 1, md: 2 }}>
        <FormControl fullWidth>
          <InputLabel id={`ms-${name}-label`}>{capitalize(name)}</InputLabel>
          <Select
            labelId={`ms-${name}-label`}
            id={`ms-${name}`}
            multiple
            value={selected}
            onChange={handleChange}
            input={<OutlinedInput label={capitalize(name)} />}
            renderValue={(selected) =>
              `${selected?.length || 0} / ${Object.keys(filters).length} selected`
            }
            MenuProps={MenuProps}
          >
            {Object.entries(filters).map(([name, value]) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={value} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
    )
  },
  (prev, next) => prev.name === next.name,
)

MultiSelect.displayName = 'MultiSelect'
