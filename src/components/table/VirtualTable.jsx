import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'

import buildData from '@services/buildData'

import MuiVirtual from './MuiVirtual'

const ReactVirtualizedTable = ({ filters, isMobile }) => {
  const {
    cp, atk, def, sta, level, iv, generations, types, forms, megas, legends, mythics,
  } = filters

  // eslint-disable-next-line max-len
  const rows = buildData(parseFloat(cp), ...atk, ...def, ...sta, ...level, ...iv, generations, types, forms, megas, legends, mythics)

  const columns = [
    {
      width: 150,
      label: 'Pokemon',
      dataKey: 'name',
    },
    {
      width: 50,
      label: 'Atk',
      dataKey: 'atk',
      numeric: true,
    },
    {
      width: 50,
      label: 'Def',
      dataKey: 'def',
      numeric: true,
    },
    {
      width: 50,
      label: 'Sta',
      dataKey: 'sta',
      numeric: true,
    },
  ]

  if (!isMobile) {
    columns.push({
      width: 50,
      label: '%',
      dataKey: 'iv',
      numeric: true,
    })
  }

  columns.push({
    width: 50,
    label: 'Lvl',
    dataKey: 'level',
    numeric: true,
  })

  return (
    <>
      <Grid item xs={12}>
        <Typography style={{ color: 'white' }} variant="h5" align="center">
          {rows.length} results for {cp}cp
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0} style={{ height: '60vh', width: isMobile ? '90vw' : 420 }}>
          <MuiVirtual
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={columns}
          />
        </Paper>
      </Grid>
    </>
  )
}

export default ReactVirtualizedTable
