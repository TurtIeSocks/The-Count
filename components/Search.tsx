'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import { useStorage } from '@lib/store'

const MIN_CP = 10
const MAX_CP = 9999

const parseCp = (raw: string) => {
  const cp = Number(raw)
  if (!Number.isFinite(cp)) return 0
  return Math.max(0, Math.floor(cp))
}

export const Search = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const cpParam = searchParams?.get('cp')

  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : event.target.value || ''
    setValue(newValue)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const cp = parseCp(value)
    const params = new URLSearchParams()
    if (Number.isFinite(cp) && cp >= MIN_CP) {
      params.set('cp', String(cp))
      router.push(`/results?${params.toString()}`)
    } else {
      router.push('/')
    }
  }

  React.useEffect(() => {
    const cp = cpParam || ''
    setValue(cp)
    useStorage.setState((prev) => {
      const parsed = parseCp(cp)
      if (parsed !== prev.filters.cp) {
        return { filters: { ...prev.filters, cp: parsed } }
      }
      return prev
    })
  }, [cpParam])

  return (
    <form
      onSubmit={handleSubmit}
      style={{ flexGrow: 1, maxWidth: pathname === '/' ? 400 : '100%' }}
    >
      <TextField
        name="cp"
        label="Combat Power (CP)"
        placeholder="e.g. 1500"
        variant="outlined"
        type="number"
        value={value}
        onChange={handleChange}
        InputProps={{
          sx: { pl: 2 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="Search by combat power">
                <SearchIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        inputProps={{ min: MIN_CP, max: MAX_CP, inputMode: 'numeric' }}
        autoComplete="off"
      />
    </form>
  )
}
