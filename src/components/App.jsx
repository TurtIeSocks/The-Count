import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

import '../assets/scss/main.scss'
import theme from '../assets/mui/theme'
import ReactVirtualizedTable from './table/VirtualTable'
import Search from './search/Search'
import AdvancedSearch from './search/AdvancedSearch'

const App = () => {
  const [filters, setFilters] = useState({
    cp: 4000,
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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h1">The Count</Typography>
        </Grid>
        {filters.cp === 0
          ? (
            <Grid item xs={11}>
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
                xs={12}
                lg={3}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <AdvancedSearch
                  onSubmit={onSubmit}
                  filters={filters}
                />
              </Grid>
              <Grid item xs={12} lg={9}>
                <ReactVirtualizedTable
                  filters={filters}
                />
              </Grid>
            </>
          )}
        <Grid item xs={12}>
          <Typography>© TurtleSocks 2021</Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
