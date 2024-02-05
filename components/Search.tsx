import * as React from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

import { useStorage } from '@lib/store'

export const Search = () => {
  const router = useRouter()
  const cpParam = useSearchParams().get('cp')

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
      router.push(
        { pathname: '/results', search: params.toString() },
        undefined,
        { shallow: true },
      )
    } else {
      router.push('/')
    }
  }

  React.useEffect(() => {
    const cp = cpParam || ''
    setValue(cp)
    useStorage.setState((prev) => {
      if (+cp !== prev.filters.cp) {
        return {
          filters: {
            ...prev.filters,
            cp: +cp || 0,
          },
        }
      }
      return prev
    })
  }, [cpParam])

  return (
    <form
      onSubmit={handleSubmit}
      style={{ flexGrow: 1, maxWidth: router.pathname === '/' ? 400 : '100%' }}
    >
      <TextField
        placeholder="Enter Combat Power (CP)"
        variant="outlined"
        type="number"
        value={value}
        onChange={handleChange}
        InputProps={{
          sx: { pl: 2 },
          endAdornment: (
            <IconButton onClick={handleSubmit}>
              <SearchIcon color="primary" />
            </IconButton>
          ),
        }}
        fullWidth
        inputProps={{
          min: 10,
        }}
        sx={{ py: 1 }}
      />
    </form>
  )
}
