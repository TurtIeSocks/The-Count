import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import ShareIcon from '@mui/icons-material/Share'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import { useStorage } from '@lib/store'
import Snackbar from '@mui/material/Snackbar'

export const ShareLink = () => {
  return (
    <IconButton
      size="large"
      onClick={() => {
        const cp = new URLSearchParams(window.location.search).get('cp')
        if (navigator.share) {
          navigator.share({
            title: 'The Count',
            text: cp
              ? `${useStorage.getState().matchCount} Pokémon IV combinations match CP ${cp}`
              : 'Search through over 500 Million IV combinations to get the best Pokémon',
            url: window.location.href,
          })
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href)
          useStorage.setState({
            shareAlert: {
              open: true,
              severity: 'success',
              message: 'Copied to clipboard!',
            },
          })
        } else {
          useStorage.setState({
            shareAlert: {
              open: true,
              severity: 'error',
              message: 'Sharing is not supported on this device.',
            },
          })
        }
      }}
    >
      <ShareIcon fontSize="large" />
    </IconButton>
  )
}

export const ShareAlert = () => {
  const alert = useStorage((s) => s.shareAlert)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    useStorage.setState((prev) => ({
      shareAlert: { ...prev.shareAlert, open: false },
    }))
  }

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{ mb: 2 }}
    >
      <Alert
        severity={alert.severity}
        onClose={handleClose}
        icon={
          alert.severity === 'success' ? (
            <CheckIcon fontSize="inherit" />
          ) : alert.severity === 'error' ? (
            <CloseIcon fontSize="inherit" />
          ) : null
        }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
