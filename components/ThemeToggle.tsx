import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { useColorScheme } from '@mui/material/styles'

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <IconButton
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      size="large"
    >
      {mode === 'dark' ? (
        <LightModeIcon fontSize="large" />
      ) : (
        <DarkModeIcon fontSize="large" />
      )}
    </IconButton>
  )
}
