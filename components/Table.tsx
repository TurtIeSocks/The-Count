import * as React from 'react'
import Table from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
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
      aria-label="Pokemon IV search results"
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),
  TableHead,
  TableRow: ({ item, ...props }) => {
    void item
    return <TableRow {...props} />
  },
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
  const cp = useStorage((s) => s.filters.cp)
  const hasSearchCp = cp >= 10
  return (
    <Grid
      size={{ xs: 12, sm: 7, md: 6, xl: 4 }}
      px={2}
      height={{ xs: 'calc(100% - 72px)', sm: '100%' }}
    >
      <Box className={styles.layout} height="100%">
        <Box mt={2}>
          <Typography variant="h6" align="center" lineHeight={1}>
            {hasSearchCp
              ? `${matches.length.toLocaleString()} results for ${cp.toLocaleString()} CP`
              : 'Enter a CP value of 10 or higher to view results'}
          </Typography>
          <Typography variant="caption" align="center">
            {hasSearchCp
              ? `Checked ${count.toLocaleString()} combinations in ${time.toLocaleString()} ms`
              : 'Use the search field above to start filtering IV combinations.'}
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
    </Grid>
  )
}
