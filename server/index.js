const express = require('express')
const path = require('path')

const app = express()
const port = 3000
const genPokedex = require('./generatePokedex.js')

app.use(express.static(path.join(__dirname, '../dist')))

app.use((req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  genPokedex()
  // eslint-disable-next-line no-console
  console.log(`Server now listening at http://localhost:${port}`)
})
