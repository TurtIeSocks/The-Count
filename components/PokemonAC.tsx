import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useStorage } from '@lib/store'
import Grid2 from '@mui/material/Unstable_Grid2'

export default function PokemonAC() {
  const filters = useStorage((s) => s.filters)
  const pokedex = useStorage((s) => s.pokedex)
  const selected = useStorage((s) => s.selected)

  const mons = React.useMemo(() => {
    return pokedex.filter((pokemon) => {
      if (pokemon.legendary && !filters.legends) return false
      if (pokemon.mythical && !filters.mythics) return false
      if (pokemon.unreleased && !filters.unreleased) return false
      if (pokemon.ultraBeast && !filters.ultraBeasts) return false
      if (pokemon.form && !filters.forms) return false
      if (pokemon.mega && !filters.megas) return false
      if (!filters.generations[pokemon.generation]) return false
      if (pokemon.types.some((type) => filters.types[type])) return true
      return false
    })
  }, [filters, pokedex])

  React.useEffect(() => {
    useStorage.setState({
      filteredDex: selected.length
        ? mons.filter((mon) => selected.includes(mon))
        : mons,
    })
  }, [mons, selected])

  return (
    <Grid2 xs={12} pt={2} pb={1}>
      <Autocomplete
        multiple
        options={mons}
        value={selected}
        disableCloseOnSelect
        renderTags={(value) => `${value.length} selected`}
        onChange={(_, value) => {
          useStorage.setState({ selected: value })
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        fullWidth
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Pokémon Selection" />
        )}
      />
    </Grid2>
  )
}
