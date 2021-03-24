/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import clsx from 'clsx'
import TableCell from '@material-ui/core/TableCell'
import { AutoSizer, Column, Table } from 'react-virtualized'
import useStyles from '../../assets/mui/styling'

const MuiVirtual = props => {
  const classes = useStyles()
  const {
    columns, onRowClick, ...tableProps
  } = props
  const headerHeight = 48
  const rowHeight = 48

  const getRowClassName = ({ index }) => (
    clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  )

  const cellRenderer = ({ cellData, columnIndex }) => (
    <TableCell
      component="div"
      className={clsx(classes.tableCell, classes.flexContainer, {
        [classes.noClick]: onRowClick == null,
      })}
      variant="body"
      style={{ height: rowHeight }}
      align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
    >
      {cellData}
    </TableCell>
  )

  const headerRenderer = ({ label, columnIndex }) => (
    <TableCell
      component="div"
      className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
      variant="head"
      style={{ height: headerHeight }}
      align={columns[columnIndex].numeric || false ? 'right' : 'left'}
    >
      <span>{label}</span>
    </TableCell>
  )
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={headerHeight}
          className={classes.table}
          {...tableProps}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => (
            <Column
              key={dataKey}
              headerRenderer={(headerProps) => (
                headerRenderer({
                  ...headerProps,
                  columnIndex: index,
                }))}
              className={classes.flexContainer}
              cellRenderer={cellRenderer}
              dataKey={dataKey}
              {...other}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  )
}

export default MuiVirtual
