import { makeStyles } from '@material-ui/styles'
import theme from '../assets/mui/theme'

export default makeStyles({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
      color: 'white',
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
    color: 'white',
  },
  noClick: {
    cursor: 'initial',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    color: 'white',
  },
})
