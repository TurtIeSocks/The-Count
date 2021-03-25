import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import buildData from '../../services/buildData'
import MuiVirtual from './MuiVirtual'

const ReactVirtualizedTable = ({ filters }) => {
  const {
    cp, atk, def, sta, level, iv,
  } = filters

  const rows = buildData(cp, ...atk, ...def, ...sta, ...level, ...iv)

  return (
    <>
      <Grid item xs={12}>
        <Typography style={{ color: 'white' }} variant="h4">
          {rows.length} Results for {cp}cp
        </Typography>
        {rows.length > 50000
          && (
            <Typography style={{ color: '#a0a0a0' }} variant="caption">
              Results have been trimmed for increased performance...
            </Typography>
          )}
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0} style={{ height: 500, width: '100%' }}>
          <MuiVirtual
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 120,
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
              {
                width: 50,
                label: 'Lvl',
                dataKey: 'level',
                numeric: true,
              },
            ]}
          />
        </Paper>
      </Grid>
    </>
  )
}

export default ReactVirtualizedTable
