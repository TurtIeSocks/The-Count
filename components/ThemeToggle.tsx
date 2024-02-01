import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import useTheme from '@mui/material/styles/useTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NoSsr from '@mui/material/NoSsr'

import { useStorage } from '../lib/store'

const handleClick = () =>
  useStorage.setState((prev) => ({ darkMode: !prev.darkMode }))

export default function ThemeToggle() {
  const theme = useTheme()

  return (
    <NoSsr>
      <IconButton
        onClick={handleClick}
        sx={{ position: 'absolute', top: 4, right: 4 }}
      >
        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </NoSsr>
  )
}
