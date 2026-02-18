import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import { useStorage } from '@lib/store'

export const PokemonAC = React.memo(
  () => {
    const selected = useStorage((s) => s.selected)
    const mons = useStorage((s) => s.pokemonSelection)
    return (
      <Grid size={12} pt={{ xs: 1, md: 2 }} pb={1}>
        <Autocomplete
          multiple
          options={mons}
          value={selected}
          disableCloseOnSelect
          renderTags={(value) => `${value.length} / ${mons.length} selected`}
          onChange={(_, value) => {
            useStorage.setState({ selected: value })
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          fullWidth
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Pokémon Selection"
            />
          )}
        />
      </Grid>
    )
  },
  () => true,
)

PokemonAC.displayName = 'PokemonAC'
