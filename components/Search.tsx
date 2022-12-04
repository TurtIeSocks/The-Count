import { useState } from 'react'
import { IconButton, Grid, Paper, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import type { Filters } from '../assets/types'

interface Props {
  filters: Filters
  onSubmit: (filters: Filters) => void
  isMobile: boolean
}

export default function Search({ filters, onSubmit, isMobile }: Props) {
  const [value, setValue] = useState(filters.cp)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({ ...filters, cp: value })
  }

  return (
    <Grid item xs={12}>
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
            onChange={(e) => setValue(+e.target.value)}
            value={value}
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
    </Grid>
  )
}
