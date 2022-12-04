import { useState } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Icon, Typography, useMediaQuery, useTheme } from '@mui/material'

import { Filters, Pokedex, Pokemon } from '../assets/types'
import AdvancedSearch from '../components/AdvSearch'
import Search from '../components/Search'
import ResultsTable from '../components/Table'

export async function getStaticProps() {
  const masterfile = await fetch(
    'https://raw.githubusercontent.com/WatWowMap/Masterfile-Generator/master/master-latest-everything.json',
  ).then((res) => res.json())

  const remoteLocale = await fetch(
    `https://raw.githubusercontent.com/WatWowMap/pogo-translations/master/static/locales/en.json`,
  ).then((res) => res.json())

  const pokedex: Record<string, Pokemon> = {}
  Object.entries(masterfile.pokemon).forEach(([id, pkmn]) => {
    const poke: any = pkmn
    const name = remoteLocale[`poke_${id}`]
    pokedex[id] = {
      name,
      forms: [],
      megas: [],
      types: [],
      attack: poke.stats.attack,
      defense: poke.stats.defense,
      stamina: poke.stats.stamina,
      generation: poke.generation,
      unreleased: poke.unreleased,
      legendary: poke.legendary,
      mythical: poke.mythic,
      ultraBeast: poke.ultraBeast,
    }
    if (poke.types) {
      Object.values(poke.types).forEach((type: any) => {
        pokedex[id].types.push(type.typeName)
      })
    }
    if (poke.forms) {
      Object.entries(poke.forms).forEach(([formId, f]) => {
        const form: any = f
        if (form.stats?.attack) {
          pokedex[id].forms.push({
            name: `${name} (${remoteLocale[`form_${formId}`]})`,
            types: form.types,
            attack: form.stats.attack,
            defense: form.stats.defense,
            stamina: form.stats.stamina,
            unreleased: form.unreleased,
          })
        }
      })
    }
    if (poke.tempEvolutions) {
      Object.entries(poke.tempEvolutions).forEach(([megaId, m]) => {
        const mega: any = m
        pokedex[id].megas.push({
          name: `${name} ${remoteLocale[`mega_${megaId}`]}`,
          types: mega.types,
          attack: mega.stats.attack,
          defense: mega.stats.defense,
          stamina: mega.stats.stamina,
          unreleased: mega.unreleased,
        })
      })
    }
  })

  return {
    props: { pokedex: JSON.parse(JSON.stringify(Object.values(pokedex))) },
  }
}

interface Props {
  pokedex: Pokedex
}

export default function Home({ pokedex = [] }: Props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const [filters, setFilters] = useState<Filters>({
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
    unreleased: false,
  })

  const onSubmit = (newFilters: Filters) => setFilters(newFilters)

  return (
    <Grid2
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        margin: 'auto',
        height: '100vh',
        xs: {
          marginTop: filters.cp ? 0 : '45%',
          maxWidth: '95vw',
        },
        sm: {
          marginTop: filters.cp ? 0 : '20%',
          maxWidth: filters.cp ? '98vw' : '50vw',
        },
        md: {
          marginTop: filters.cp ? 0 : '20%',
          maxWidth: filters.cp ? '80vw' : '40vw',
        },
      }}
    >
      <Grid2 xs={12} sx={{ textAlign: 'center', my: isMobile ? 2 : 1 }}>
        <Typography color="secondary" variant={filters.cp ? 'h2' : 'h1'}>
          The Count
        </Typography>
      </Grid2>
      {filters.cp ? (
        <>
          <Grid2 container xs={12} sm={5} md={6} lg={5} direction="row">
            <AdvancedSearch
              onSubmit={onSubmit}
              filters={filters}
              isMobile={isMobile}
            />
          </Grid2>
          <Grid2 container xs={12} sm={7} md={6} lg={7} direction="row">
            <ResultsTable
              filters={filters}
              isMobile={isMobile}
              pokedex={pokedex}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" align="center">
              Calculator for Pokemon GO communities that play the popular game,
              &quot;The Count&quot;{' '}
            </Typography>
          </Grid2>
          <Grid2 container xs={12}>
            <Search onSubmit={onSubmit} filters={filters} isMobile={isMobile} />
          </Grid2>
        </>
      )}
      <Grid2 xs={12} sx={{ textAlign: 'center', py: 2 }}>
        <Typography
          style={{
            marginTop: filters.cp ? 0 : '35vh',
            color: theme.palette.text.secondary,
          }}
        >
          © TurtleSocks 2021{' '}
          <a
            href="https://github.com/TurtIeSocks"
            target="_blank"
            rel="noreferrer"
          >
            <Icon className="fab fa-github" style={{ fontSize: 12 }} />
          </a>
        </Typography>
      </Grid2>
    </Grid2>
  )
}
