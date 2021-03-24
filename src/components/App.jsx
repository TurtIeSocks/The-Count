import React from 'react'
import buildData from '../services/buildData'

const App = () => {
  const selectedCp = 500
  const minAtk = 0
  const maxAtk = 15
  const minDef = 0
  const maxDef = 15
  const minSta = 0
  const maxSta = 15
  const minLevel = 1
  const maxLevel = 50
  const minIv = 0
  const maxIv = 1
  const data = buildData(selectedCp, minAtk, maxAtk, minDef, maxDef, minSta, maxSta, minLevel, maxLevel, minIv, maxIv)

  return (
    <div>
      <div>CP: {selectedCp}</div>
      <div>MinAtk: {minAtk} || MaxAtk: {maxAtk}</div>
      <div>MinDef: {minDef} || MaxDef: {maxDef}</div>
      <div>MinSta: {minSta} || MaxSta: {maxSta}</div>
      <div>MinLevel: {minLevel} || MaxLevel: {maxLevel}</div>
      <div>MinIV: {minIv} || MaxIV: {maxIv}</div>
      <br />
      <div>Matches: {data.length}</div>
      {data.map(entry => (
        <div key={`${entry.num}-${entry.atk}-${entry.def}-${entry.sta}-${entry.level}`}>
          {entry.name} a: {entry.atk} def: {entry.def} sta: {entry.sta} level: {entry.level}
        </div>
      ))}
    </div>
  )
}

export default App
