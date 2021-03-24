import React from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import buildData from '../../services/buildData'
import MuiVirtual from './MuiVirtual'
import useStyles from '../../assets/mui/styling'

const ReactVirtualizedTable = ({ filters }) => {
  const classes = useStyles()
  const {
    cp, atk, def, sta, level, iv,
  } = filters

  const rows = buildData(cp, ...atk, ...def, ...sta, ...level, ...iv)

  return (
    <Paper elevation={0} style={{ height: 300, width: '100%' }}>
      <Divider light variant="middle" className={classes.divider} />
      <Typography style={{ color: 'white' }} variant="h4">
        {rows.length} Results for {cp}cp
      </Typography>
      <Divider light variant="middle" className={classes.divider} />
      <MuiVirtual
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 200,
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
            width: 75,
            label: 'Level',
            dataKey: 'level',
            numeric: true,
          },
        ]}
      />
    </Paper>
  )
}

export default ReactVirtualizedTable
