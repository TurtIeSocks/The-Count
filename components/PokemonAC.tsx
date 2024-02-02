import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useStorage } from '@lib/store'
import Grid2 from '@mui/material/Unstable_Grid2'

const PokemonAC = React.memo(
  () => {
    const selected = useStorage((s) => s.selected)
    const mons = useStorage((s) => s.pokemonSelection)
    return (
      <Grid2 xs={12} pt={2} pb={1}>
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
      </Grid2>
    )
  },
  () => true,
)

PokemonAC.displayName = 'PokemonAC'

export default PokemonAC
