import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import type { MasterfilePkmn, Pokedex, Pokemon } from '../assets/types'
import AdvancedSearch from '../components/AdvSearch'
import Search from '../components/Search'
import ResultsTable from '../components/Table'
import { setPokedex, useStorage } from '../lib/store'
import GitHubIcon from '@mui/icons-material/GitHub'
import ThemeToggle from '../components/ThemeToggle'

export async function getStaticProps() {
  const masterfile: { pokemon: Record<string, MasterfilePkmn> } = await fetch(
    'https://raw.githubusercontent.com/WatWowMap/Masterfile-Generator/master/master-latest-everything.json',
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('[Masterfile]', err)
      return { pokemon: {} }
    })

  const remoteLocale: Record<string, string> = await fetch(
    `https://raw.githubusercontent.com/WatWowMap/pogo-translations/master/static/locales/en.json`,
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('[Locales]', err)
      return {}
    })

  const pokedex: Record<string, Pokemon> = {}
  Object.entries(masterfile.pokemon).forEach(([id, pkmn]) => {
    const name = remoteLocale[`poke_${id}`]
    pokedex[id] = {
      name,
      forms: [],
      megas: [],
      types: Object.values(pkmn.types).map((type: any) => {
        return type.typeName as string
      }),
      attack: pkmn.stats.attack,
      defense: pkmn.stats.defense,
      stamina: pkmn.stats.stamina,
      generation: pkmn.generation,
      unreleased: pkmn.unreleased,
      legendary: pkmn.legendary,
      mythical: pkmn.mythic,
      ultraBeast: pkmn.ultraBeast,
    }
    if (pkmn.forms) {
      Object.entries(pkmn.forms).forEach(([formId, f]) => {
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
    if (pkmn.tempEvolutions) {
      Object.entries(pkmn.tempEvolutions).forEach(([megaId, m]) => {
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
  const cp = useStorage((state) => !!state.filters.cp)
  React.useEffect(() => setPokedex(pokedex), [pokedex])

  return (
    <Box className="layout" height="100vh">
      <ThemeToggle />
      <Typography
        color="secondary"
        variant="h1"
        fontWeight="bold"
        component="header"
      >
        The Count
      </Typography>
      {cp ? (
        <Grid2 container overflow="hidden">
          <AdvancedSearch />
          <ResultsTable />
        </Grid2>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          overflow="hidden"
        >
          <Box maxWidth={400} px={2} mb={6}>
            <Typography variant="h6" align="center" pb={2}>
              Calculator for Pokemon GO communities that play the popular game,
              &quot;The Count&quot;{' '}
            </Typography>
            <Search />
          </Box>
        </Box>
      )}
      <Box className="footer" component="footer">
        <Typography variant="caption" align="center">
          © TurtleSocks 2024
        </Typography>
        <IconButton
          href="https://github.com/TurtIeSocks/"
          target="_blank"
          rel="noreferrer"
          sx={{ color: 'background.paper' }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
