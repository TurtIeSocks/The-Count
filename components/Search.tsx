import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import { useStorage } from '../lib/store'

export default function Search() {
  const value = useStorage((s) => s.filters.cp)
  const [local, setLocal] = React.useState<number | ''>(value || '')

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      if (typeof local === 'number') {
        useStorage.setState((prev) => ({
          filters: { ...prev.filters, cp: local },
        }))
      }
    },
    [local],
  )

  return (
    <Grid2 xs={12}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={0}
          variant="outlined"
          style={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            margin: 3,
            backgroundColor: '#2E2E2E',
          }}
        >
          <InputBase
            style={{ flex: 1, margin: 6 }}
            placeholder="Enter Combat Power (CP)"
            name="cp"
            onChange={(e) => {
              console.log(e.target.value)
              const num = +e.target.value
              return setLocal(Number.isInteger(num) ? num : '')
            }}
            value={local}
            fullWidth
            autoComplete="off"
            type="number"
            inputProps={{
              min: 10,
            }}
          />
          <IconButton style={{ padding: 10 }} onClick={handleSubmit}>
            <SearchIcon color="secondary" />
          </IconButton>
        </Paper>
      </form>
    </Grid2>
  )
}
