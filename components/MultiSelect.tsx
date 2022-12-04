import { useState } from 'react'
import {
  Typography,
  Grid,
  MenuItem,
  ListItemText,
  IconButton,
  Menu,
  Checkbox,
  capitalize,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import type { Filters } from '../assets/types'

interface Props {
  name: keyof Filters
  filters: Filters
  onSubmit: (filters: Filters) => void
}

const MultiSelect = ({ name, filters, onSubmit }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Grid item xs={4}>
        <Typography>{capitalize(name)}</Typography>
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
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 500,
            width: '20ch',
          },
        }}
      >
        {Object.entries(filters[name]).map(([itemName, value]) => (
          <MenuItem key={itemName} dense value={value}>
            <Checkbox
              checked={value}
              onChange={(e) => {
                const filterName = filters[name]
                if (typeof filterName === 'object') {
                  onSubmit({
                    ...filters,
                    [name]: {
                      ...filterName,
                      [itemName]: e.target.checked,
                    },
                  })
                }
              }}
              name={itemName}
            />
            <ListItemText primary={capitalize(itemName)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MultiSelect
