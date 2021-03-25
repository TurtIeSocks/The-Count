import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

import '../assets/scss/main.scss'
import theme from '../assets/mui/theme'
import ReactVirtualizedTable from './table/VirtualTable'
import Search from './search/Search'
import AdvancedSearch from './search/AdvancedSearch'
import useStyles from '../assets/mui/styling'

const App = () => {
  const classes = useStyles()
  const [filters, setFilters] = useState({
    cp: 0,
    atk: [0, 15],
    def: [0, 15],
    sta: [0, 15],
    level: [1, 50],
    iv: [0, 100],
  })

  const onSubmit = newFilters => {
    setFilters(newFilters)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          style={{ marginTop: filters.cp === 0 ? '50%' : 0 }}
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography color="secondary" variant={filters.cp === 0 ? 'h1' : 'h6'}>The Count</Typography>
          </Grid>
          {filters.cp === 0
            ? (
              <Grid container item xs={11}>
                <Search
                  onSubmit={onSubmit}
                  filters={filters}
                />
              </Grid>
            )
            : (
              <>
                <Grid
                  container
                  item
                  xs={11}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <AdvancedSearch
                    onSubmit={onSubmit}
                    filters={filters}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={11}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <ReactVirtualizedTable
                    filters={filters}
                  />
                </Grid>
              </>
            )}
          <Grid item>
            <Typography style={{ marginTop: filters.cp === 0 ? '100%' : 0, color: theme.palette.text.hint }}>
              © TurtleSocks 2021 | <a href="https://github.com/TurtIeSocks">GitHub</a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default App
