'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso, TableComponents } from 'react-virtuoso'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { capitalize } from '@mui/material/utils'

import { useCalculate } from '../lib/useCalculate'
import { COLUMNS } from '../lib/constants'
import { Match, Pokedex } from '../lib/types'
import { useStorage } from '../lib/store'
import { useSearchParams } from 'next/navigation'

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

function fixedHeaderContent() {
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

function itemContent(_index: number, row: Match) {
  return (
    <React.Fragment>
      {COLUMNS.map((column, i) => (
        <TableCell key={column} align="center" width={i ? '15%' : '25%'}>
          {row[column]}
        </TableCell>
      ))}
    </React.Fragment>
  )
}

export default function ResultTable({ pokedex }: { pokedex: Pokedex }) {
  const searchParams = useSearchParams()
  const cp = +(searchParams.get('cp') || '0')
  const data = useCalculate(pokedex, cp)
  const unreleased = useStorage((s) => s.filters.unreleased)

  return (
    <Grid2
      className="layout"
      xs={12}
      sm={6}
      height="100%"
      overflow="hidden"
      p={2}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {data.length.toLocaleString()} results for {cp.toLocaleString()} CP
      </Typography>
      <TableVirtuoso
        data={data}
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
    </Grid2>
  )
}
