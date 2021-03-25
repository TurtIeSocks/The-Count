const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

app.use(express.static(path.join(__dirname, '../dist')))

app.use((req, res) => {
  res.redirect('/')
})

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at ${host}:${port}`)
})
