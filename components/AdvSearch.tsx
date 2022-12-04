import { useState } from 'react'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import MultiSelect from './MultiSelect'
import SliderTile from './SliderTile'
import FilterSwitch from './FilterSwitch'
import Search from './Search'

import type { Filters } from '../assets/types'

interface Props {
  filters: Filters
  onSubmit: (filters: Filters) => void
  isMobile: boolean
}

export default function AdvancedSearch({ onSubmit, filters, isMobile }: Props) {
  const [accordion, setAccordion] = useState(!isMobile)

  const sliders = [
    {
      name: 'Level',
      shortName: 'level',
      min: 1,
      max: 55,
    },
    {
      name: 'Attack',
      shortName: 'atk',
      min: 0,
      max: 15,
    },
    {
      name: 'Defense',
      shortName: 'def',
      min: 0,
      max: 15,
    },
    {
      name: 'Stamina',
      shortName: 'sta',
      min: 0,
      max: 15,
    },
    {
      name: 'IV Range',
      shortName: 'iv',
      min: 0,
      max: 100,
    },
  ].map((each) => (
    <Grid2
      key={each.name}
      xs={each.shortName === 'iv' ? 12 : 6}
      style={{ textAlign: 'center' }}
    >
      <SliderTile
        name={each.name}
        shortName={each.shortName}
        min={each.min}
        max={each.max}
        handleChange={(name, newValues) =>
          onSubmit({ ...filters, [name]: newValues })
        }
        values={filters[each.shortName as keyof Filters] as number[]}
        color="secondary"
      />
    </Grid2>
  ))

  return (
    <>
      <Search onSubmit={onSubmit} filters={filters} isMobile={isMobile} />
      <Grid2 xs={12}>
        <Accordion
          expanded={accordion}
          onChange={() => setAccordion(!accordion)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography>Advanced Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid2 container direction="row">
              {sliders}
              {['generations', 'types'].map((each) => (
                <MultiSelect
                  key={each}
                  name={each as keyof Filters}
                  filters={filters}
                  onSubmit={onSubmit}
                />
              ))}
              {['forms', 'megas', 'unreleased', 'legends', 'mythics'].map(
                (each) => (
                  <FilterSwitch
                    key={each}
                    name={each as keyof Filters}
                    filters={filters}
                    onSubmit={onSubmit}
                  />
                ),
              )}
            </Grid2>
          </AccordionDetails>
        </Accordion>
      </Grid2>
    </>
  )
}
