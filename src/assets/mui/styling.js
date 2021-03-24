import { makeStyles } from '@material-ui/styles'
import theme from './theme'

export default makeStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  background: {
    top: 0,
    margin: 'auto',
    backgroundColor: theme.background,
  },
  divider: {
    color: 'white',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  white: {
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
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
})
