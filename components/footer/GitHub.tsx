import * as React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'

export const GitHubLink = () => {
  return (
    <IconButton
      href="https://github.com/TurtIeSocks/The-Count"
      target="_blank"
      rel="noreferrer"
      size="large"
      aria-label="Open GitHub repository"
    >
      <GitHubIcon fontSize="large" />
    </IconButton>
  )
}
