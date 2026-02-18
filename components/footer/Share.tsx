import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import ShareIcon from '@mui/icons-material/Share'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import { useStorage } from '@lib/store'
import Snackbar from '@mui/material/Snackbar'

export const ShareLink = () => {
  return (
    <IconButton
      size="large"
      aria-label="Share current results"
      onClick={async () => {
        const cp = new URLSearchParams(window.location.search).get('cp')
        try {
          if (navigator.share) {
            await navigator.share({
              title: 'The Count',
              text: cp
                ? `${useStorage.getState().matchCount.toLocaleString()} Pokémon IV combinations for CP ${(+cp).toLocaleString()}`
                : 'Search through over 500 Million IV combinations to get the best Pokémon',
              url: window.location.href,
            })
            return
          }

          if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href)
            useStorage.setState({
              shareAlert: {
                open: true,
                severity: 'success',
                message: 'Copied to clipboard!',
              },
            })
            return
          }

          useStorage.setState({
            shareAlert: {
              open: true,
              severity: 'error',
              message: 'Sharing is not supported on this device.',
            },
          })
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return
          }
          useStorage.setState({
            shareAlert: {
              open: true,
              severity: 'error',
              message: 'Unable to share right now. Please try again.',
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
        role="status"
        aria-live="polite"
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
