import * as React from 'react'
import Table from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import { capitalize } from '@mui/material/utils'
import { TableVirtuoso, TableComponents } from 'react-virtuoso'

import { useCalculate } from '@lib/useCalculate'
import { COLUMNS } from '@lib/constants'
import { Match } from '@lib/types'
import { useStorage } from '@lib/store'

import styles from '../styles.module.css'

const Scroller = React.forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer component={Paper} {...props} ref={ref} />
))
Scroller.displayName = 'Scroller'

const TableBody = React.forwardRef<HTMLTableSectionElement>((props, ref) => (
  <MuiTableBody {...props} ref={ref} />
))
TableBody.displayName = 'TableBody'

const VirtuosoTableComponents: TableComponents<Match> = {
  Scroller,
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody,
}

const fixedHeaderContent = () => {
  return (
    <TableRow sx={{ bgcolor: 'background.paper' }}>
      {COLUMNS.map((column, i) => (
        <TableCell
          key={column}
          variant="head"
          align="center"
          width={i ? '15%' : '25%'}
        >
          {column.length > 3 ? capitalize(column) : column.toUpperCase()}
        </TableCell>
      ))}
    </TableRow>
  )
}

const itemContent = (_index: number, row: Match) => {
  return (
    <React.Fragment>
      {COLUMNS.map((column, i) => (
        <TableCell key={column} align="center" width={i ? '15%' : '25%'}>
          {column === 'iv'
            ? (((row.atk + row.def + row.sta) / 45) * 100).toFixed(1)
            : row[column]}
        </TableCell>
      ))}
    </React.Fragment>
  )
}

export const ResultTable = () => {
  const { matches, count, time } = useCalculate()
  const unreleased = useStorage((s) => s.filters.unreleased)
  return (
    <Grid2
      xs={12}
      sm={7}
      px={2}
      md={6}
      xl={4}
      height={{ xs: 'calc(100% - 72px)', sm: '100%' }}
    >
      <Box className={styles.layout} height="100%">
        <Box mt={2}>
          <Typography variant="h6" align="center" lineHeight={1}>
            {matches.length.toLocaleString()} results for{' '}
            {useStorage.getState().filters.cp.toLocaleString()} CP
          </Typography>
          <Typography variant="caption" align="center">
            Checked {count.toLocaleString()} combinations in{' '}
            {time.toLocaleString()} ms
          </Typography>
        </Box>
        <TableVirtuoso
          data={matches}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={itemContent}
        />
        {unreleased && (
          <Typography variant="caption">
            * Indicates the Pokemon&apos;s stats are estimated and may be
            inaccurate
          </Typography>
        )}
      </Box>
    </Grid2>
  )
}
