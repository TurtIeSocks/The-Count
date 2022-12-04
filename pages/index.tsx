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
      types: Object.values(poke.types).map((type: any) => {
        return type.typeName as string
      }),
      attack: poke.stats.attack,
      defense: poke.stats.defense,
      stamina: poke.stats.stamina,
      generation: poke.generation,
      unreleased: poke.unreleased,
      legendary: poke.legendary,
      mythical: poke.mythic,
      ultraBeast: poke.ultraBeast,
    }
    if (poke.forms) {
      Object.entries(poke.forms).forEach(([formId, f]) => {
        const form: any = f
        if (form.stats?.attack && +formId) {
          pokedex[id].forms.push({
            name: `${name} (${remoteLocale[`form_${formId}`]})`,
            types:
              form.types &&
              Object.values(form.types).map((type: any) => {
                return type.typeName as string
              }),
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
        if (+megaId) {
          pokedex[id].megas.push({
            name: `${name} ${remoteLocale[`evo_${megaId}`]}`,
            types:
              mega.types &&
              Object.values(mega.types).map((type: any) => {
                return type.typeName as string
              }),
            attack: mega.stats.attack,
            defense: mega.stats.defense,
            stamina: mega.stats.stamina,
            unreleased: mega.unreleased,
          })
        }
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
  console.log({ pokedex })

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 30 30"
              fill="white"
              textAnchor="middle"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
          </a>
        </Typography>
      </Grid2>
    </Grid2>
  )
}
