import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

export const HomeLink = () => {
  const pathname = usePathname()
  const home = pathname === '/'

  return (
    <Box
      display={home ? 'none' : 'flex'}
      flexGrow={1}
      justifyContent="flex-start"
    >
      <IconButton
        LinkComponent={Link}
        href="/"
        size="large"
        aria-label="Go to home page"
      >
        <HomeIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
