import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import useStyles from '../../assets/mui/styling'

const Search = ({ filters, onSubmit }) => {
  const classes = useStyles()
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
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        color="secondary"
        name="cp"
        required
        onChange={handleChange}
        label="Enter Desired CP"
        type="number"
        variant="filled"
        fullWidth
        InputProps={{
          className: classes.white,
        }}
      />
    </form>
  )
}

export default Search
