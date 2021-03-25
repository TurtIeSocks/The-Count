import React, { useState } from 'react'
import { TextField, IconButton, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Search = ({ filters, onSubmit }) => {
  const [values, setValues] = useState(filters)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: parseFloat(event.target.value),
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <>
      <Grid item xs={11}>
        <form
          onSubmit={handleSubmit}
        >
          <TextField
            color="secondary"
            name="cp"
            onChange={handleChange}
            label="Enter Desired CP..."
            type="number"
            variant="filled"
            fullWidth
          />
        </form>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={handleSubmit} color="secondary" variant="contained">
          <SearchIcon />
        </IconButton>
      </Grid>
    </>
  )
}

export default Search
