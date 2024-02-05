import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import HelpIcon from '@mui/icons-material/Help'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

import { useStorage } from '@lib/store'

const onClick = () => useStorage.setState({ helpDialog: true })

export const HelpBtn = () => {
  return (
    <IconButton size="large" onClick={onClick}>
      <HelpIcon fontSize="large" />
    </IconButton>
  )
}

const onClose = () => useStorage.setState({ helpDialog: false })

export const HelpDialog = () => {
  const open = useStorage((s) => s.helpDialog)
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: 'secondary.main' }}>
        What Is This?
      </DialogTitle>
      <DialogContent sx={{ mt: 4, textAlign: 'center' }}>
        This is a simple web app that allows you to search for Pokémon IV
        combinations that can reach the specified combat power (CP) in Pokémon
        Go. It is designed to save players time and resources by allowing them
        to both check if a Pokémon is worth investing in before they power it up
        and to ensure they are only spending resources on their best Pokémon.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
