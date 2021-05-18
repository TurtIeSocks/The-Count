import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Grid, Typography, Icon } from '@material-ui/core'

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
    generations: {
      Kanto: true,
      Johto: true,
      Hoenn: true,
      Sinnoh: true,
      Unova: true,
      Kalos: true,
      Alola: true,
      Galar: true,
    },
    types: {
      Normal: true,
      Fire: true,
      Water: true,
      Grass: true,
      Electric: true,
      Ice: true,
      Fighting: true,
      Poison: true,
      Ground: true,
      Flying: true,
      Psychic: true,
      Bug: true,
      Rock: true,
      Ghost: true,
      Dark: true,
      Dragon: true,
      Steel: true,
      Fairy: true,
    },
    forms: true,
    megas: true,
    legends: true,
    mythics: true,
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
          style={{ marginTop: filters.cp === 0 ? '45%' : 0 }}
          spacing={3}
        >
          <Grid item>
            <Typography color="secondary" variant={filters.cp === 0 ? 'h1' : 'h6'}>The Count</Typography>
          </Grid>
          {filters.cp === 0
            ? (
              <>
                <Grid item xs={8}>
                  <Typography variant="caption" align="justify">Calculator for communities that play the popular game, &quot;The Count.&quot; </Typography>
                </Grid>
                <Grid container item xs={11}>
                  <Search
                    onSubmit={onSubmit}
                    filters={filters}
                  />
                </Grid>
              </>
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
            <Typography style={{ marginTop: filters.cp === 0 ? '95%' : 0, color: theme.palette.text.hint }}>
              © TurtleSocks 2021 <a href="https://github.com/TurtIeSocks" target="_blank" rel="noreferrer"><Icon className="fab fa-github" style={{ fontSize: 12 }} /></a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default App
