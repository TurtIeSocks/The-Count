import * as React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'

export function ApplyGlobal() {
  return (
    <GlobalStyles
      styles={(theme) => {
        const darkMode = theme.palette.mode === 'dark'
        const grey = darkMode ? 900 : 50
        return {
          body: {
            backgroundColor: `${theme.palette.background.paper}${typeof window === 'undefined' ? '' : ' !important'}`,
          },
          '*': {
            scrollbarWidth: 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[grey],
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.selected,
            borderRadius: '3px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.action.selected,
          },
          '*::-webkit-scrollbar-thumb:active': {
            backgroundColor: theme.palette.action.selected,
          },
        }
      }}
    />
  )
}

export const globalStyles = <ApplyGlobal />
