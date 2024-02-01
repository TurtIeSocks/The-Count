'use client'

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Grid2 from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import TextField from '@mui/material/TextField'

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : event.target.value || ''
    setValue(newValue)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const params = new URLSearchParams()
    if (value) {
      params.set('cp', value)
      router.push(`/results?${params.toString()}`)
    } else {
      router.push('/')
    }
  }

  React.useEffect(() => {
    setValue(searchParams.get('cp') || '')
  }, [searchParams])

  return (
    <Grid2 xs={12}>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter Combat Power (CP)"
          variant="outlined"
          type="number"
          value={value}
          onChange={handleChange}
          InputProps={{
            sx: { pl: 2 },
            endAdornment: (
              <IconButton style={{ padding: 10 }} onClick={handleSubmit}>
                <SearchIcon color="primary" />
              </IconButton>
            ),
          }}
          fullWidth
          inputProps={{
            min: 10,
          }}
          sx={{ boxShadow: 1 }}
        />
      </form>
    </Grid2>
  )
}
