import * as React from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'

export function ApplyGlobal() {
  return (
    <GlobalStyles
      styles={(theme) => ({
        body: {
          backgroundColor: `${theme.palette.background.paper}${typeof window === 'undefined' ? '' : ' !important'}`,
        },
      })}
    />
  )
}

export const globalStyles = <ApplyGlobal />
