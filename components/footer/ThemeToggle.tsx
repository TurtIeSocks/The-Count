import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { useColorScheme } from '@mui/material/styles'

export const ThemeToggle = () => {
  const { mode, systemMode, setMode } = useColorScheme()
  const determinedMode = mode === 'system' ? systemMode : mode
  return (
    <IconButton
      onClick={() => setMode(determinedMode === 'dark' ? 'light' : 'dark')}
      size="large"
      aria-label={
        determinedMode === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
    >
      {determinedMode === 'dark' ? (
        <LightModeIcon fontSize="large" />
      ) : (
        <DarkModeIcon fontSize="large" />
      )}
    </IconButton>
  )
}
