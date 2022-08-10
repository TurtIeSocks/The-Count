import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import {
  Grid, Typography, Icon, useMediaQuery,
} from '@material-ui/core'

import '@assets/scss/main.scss'
import theme from '@assets/mui/theme'
import fetchData from '@services/fetchData'

import ReactVirtualizedTable from '@components/table/VirtualTable'
import Search from '@components/search/Search'
import AdvancedSearch from '@components/search/AdvancedSearch'

const App = () => {
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'))
  const [pokedex, setPokedex] = useState([])
  const [filters, setFilters] = useState({
    cp: '',
    atk: [0, 15],
    def: [0, 15],
    sta: [0, 15],
    level: [1, 50],
    iv: [0, 100],
    Generations: {
      Kanto: true,
      Johto: true,
      Hoenn: true,
      Sinnoh: true,
      Unova: true,
      Kalos: true,
      Alola: true,
      Galar: true,
    },
    Types: {
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
    Forms: true,
    Megas: true,
    Legends: true,
    Mythics: true,
    Unreleased: false,
  })

  const onSubmit = newFilters => setFilters(newFilters)

  const getStyling = () => {
    if (isMobile) {
      return {
        marginTop: filters.cp ? 0 : '45%',
        maxWidth: '95vw',
      }
    }
    if (isTablet) {
      return {
        marginTop: filters.cp ? 0 : '20%',
        maxWidth: filters.cp ? '98vw' : '50vw',
      }
    }
    return {
      marginTop: filters.cp ? 0 : '20%',
      maxWidth: filters.cp ? '80vw' : '40vw',
    }
  }

  useEffect(() => {
    fetchData().then(data => setPokedex(data))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{
          margin: 'auto',
          height: '100%',
          ...getStyling(),
        }}
        spacing={3}
      >
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography color="secondary" variant={filters.cp ? 'h4' : 'h1'}>The Count</Typography>
        </Grid>
        {filters.cp
          ? (
            <>
              <Grid
                container
                item
                xs={12}
                sm={5}
                md={6}
                lg={5}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <AdvancedSearch
                  onSubmit={onSubmit}
                  filters={filters}
                  isMobile={isMobile}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={7}
                md={6}
                lg={7}
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <ReactVirtualizedTable
                  filters={filters}
                  isMobile={isMobile}
                  pokedex={pokedex}
                />
              </Grid>
            </>
          )
          : (
            <>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" align="center">Calculator for Pokemon GO communities that play the popular game, &quot;The Count&quot; </Typography>
              </Grid>
              <Grid container item xs={12} justify="center" alignItems="center">
                <Search
                  onSubmit={onSubmit}
                  filters={filters}
                  isMobile={isMobile}
                />
              </Grid>
            </>
          )}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography style={{ marginTop: filters.cp ? 0 : '35vh', color: theme.palette.text.hint }}>
            © TurtleSocks 2021 <a href="https://github.com/TurtIeSocks" target="_blank" rel="noreferrer"><Icon className="fab fa-github" style={{ fontSize: 12 }} /></a>
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
