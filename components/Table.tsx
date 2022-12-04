/* eslint-disable react-hooks/exhaustive-deps */
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { Column, Filters, Match, Pokedex } from '../assets/types'
import { useEffect, useState } from 'react'
import buildData from '../lib/filter'
import { capitalize, Divider, Typography } from '@mui/material'

interface Props {
  filters: Filters
  isMobile: boolean
  pokedex: Pokedex
}

export function Row({ index, style, data }: ListChildComponentProps) {
  const {
    rows,
    columns,
    isMobile,
  }: {
    rows: Match[]
    columns: Column[]
    isMobile: boolean
  } = data
  const item = rows[index]

  return item === undefined || item === null ? (
    <Grid2 />
  ) : (
    <Grid2
      container
      direction="row"
      justifyContent="space-between"
      columns={isMobile ? 12 : 14}
      style={style}
    >
      {columns
        .filter((column) => (isMobile ? column !== 'iv' : true))
        .map((column) => (
          <Grid2 key={column} xs={column === 'name' ? 4 : 2}>
            <Typography variant="caption">{item[column]}</Typography>
          </Grid2>
        ))}
    </Grid2>
  )
}

export default function VirtualTable({ filters, isMobile, pokedex }: Props) {
  const [columns] = useState<Column[]>([
    'name',
    'atk',
    'def',
    'sta',
    'iv',
    'level',
  ])
  const [rows, setRows] = useState<Match[]>([])

  useEffect(() => {
    setRows(pokedex.flatMap((pokemon) => buildData(filters, pokemon)))
  }, [filters])

  return (
    <>
      <Paper
        elevation={0}
        component={Grid2}
        xs={12}
        container
        sx={{ width: isMobile ? '90vw' : 420 }}
      >
        <Grid2 xs={12} sx={{ my: 2 }}>
          <Typography sx={{ color: 'white' }} variant="h5" align="center">
            {rows.length} results for {filters.cp}cp
          </Typography>
        </Grid2>
        <Grid2 container columns={isMobile ? 12 : 14} xs={isMobile ? 12 : 14}>
          {columns
            .filter((column) => (isMobile ? column !== 'iv' : true))
            .map((column) => (
              <Grid2 key={column} xs={column === 'name' ? 4 : 2}>
                <Typography variant="caption">{capitalize(column)}</Typography>
              </Grid2>
            ))}
        </Grid2>
        <Divider
          light
          flexItem
          sx={{ height: 1, width: '100%', bgcolor: '#bdbdbd', my: 1 }}
        />
        <Grid2 xs={12} sx={{ height: '60vh', width: isMobile ? '90vw' : 420 }}>
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={rows.length}
                itemSize={40}
                itemData={{ rows, columns, isMobile }}
              >
                {Row}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Grid2>
      </Paper>
      {filters.unreleased && (
        <Grid2 xs={12} style={{ textAlign: 'center' }}>
          <Typography style={{ color: 'white' }} variant="caption">
            * Indicates the Pokemon&apos;s stats are estimated and may be
            inaccurate
          </Typography>
        </Grid2>
      )}
    </>
  )
}
