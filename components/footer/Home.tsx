import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

export const HomeLink = () => {
  const router = useRouter()
  const home = router.pathname === '/'

  return (
    <Box
      display={home ? 'none' : 'flex'}
      flexGrow={1}
      justifyContent="flex-start"
    >
      <IconButton LinkComponent={Link} href="/" size="large">
        <HomeIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
