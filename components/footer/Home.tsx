import * as React from 'react'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'

export const HomeLink = () => {
  return (
    <IconButton LinkComponent={Link} href="/" size="large">
      <HomeIcon fontSize="large" />
    </IconButton>
  )
}
