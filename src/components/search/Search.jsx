import React, { useState } from 'react'
import {
  IconButton, Grid, Paper, InputBase,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Search = ({ filters, onSubmit, isMobile }) => {
  const [value, setValue] = useState(filters.cp)

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({ ...filters, cp: value })
  }

  return (
    <Grid item xs={12}>
      <form
        onSubmit={handleSubmit}
      >
        <Paper
          elevation={0}
          variant="outlined"
          style={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            margin: 3,
            backgroundColor: '#2E2E2E',
            maxWidth: isMobile ? 600 : 'inherit',
          }}
        >
          <InputBase
            style={{ flex: 1, margin: 6 }}
            placeholder="Enter Combat Power (CP)"
            name="cp"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            fullWidth
            autoComplete="off"
            variant="filled"
            type="number"
            inputProps={{
              min: 10,
            }}
          />
          <IconButton
            style={{ padding: 10 }}
            onClick={handleSubmit}
          >
            <SearchIcon color="secondary" />
          </IconButton>
        </Paper>
      </form>
    </Grid>
  )
}

export default Search
