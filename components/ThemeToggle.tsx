'use client'

import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import useTheme from '@mui/material/styles/useTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { useStorage } from '../lib/store'

const handleClick = () =>
  useStorage.setState((prev) => ({ darkMode: !prev.darkMode }))

export default function ThemeToggle() {
  const theme = useTheme()

  return (
    <IconButton onClick={handleClick} size="large">
      {theme.palette.mode === 'dark' ? (
        <LightModeIcon fontSize="large" />
      ) : (
        <DarkModeIcon fontSize="large" />
      )}
    </IconButton>
  )
}
