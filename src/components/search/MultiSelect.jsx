import React, { useState } from 'react'
import {
  Typography, Grid, MenuItem, ListItemText, IconButton, Menu, Checkbox,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const MultiSelect = ({ name, filters, onSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
      <Grid item xs={4}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon style={{ color: 'white' }} />
        </IconButton>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '20ch',
          },
        }}
      >
        {Object.entries(filters[name.toLowerCase()]).map(([itemName, value]) => (
          <MenuItem key={itemName} value={value}>
            <Checkbox
              checked={value}
              onChange={(e) => onSubmit({
                ...filters,
                [name.toLowerCase()]: {
                  ...filters[name.toLowerCase()],
                  [itemName]: e.target.checked,
                },
              })}
              name={itemName}
            />
            <ListItemText primary={itemName} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MultiSelect
