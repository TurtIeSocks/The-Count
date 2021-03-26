import React, { useState } from 'react'
import {
  Typography, Grid, MenuItem, ListItemText, IconButton, Menu, Checkbox,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const MultiSelect = ({ type, values, setValues }) => {
  const [filters, setFilters] = useState(values[type.toLowerCase()])
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleChange = (name, event) => {
    setFilters({ ...filters, [name]: event.target.checked })
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setValues({ ...values, [type.toLowerCase()]: filters })
  }

  return (
    <>
      <Grid item xs={4}>
        <Typography>{type}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon style={{ color: 'white' }} />
        </IconButton>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '20ch',
          },
        }}
      >
        {Object.entries(filters).map((each) => (
          <MenuItem key={each[0]} value={each[1]}>
            <Checkbox
              checked={each[1]}
              onChange={(e) => handleChange(each[0], e)}
              name={each[0]}
            />
            <ListItemText primary={each[0]} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MultiSelect
