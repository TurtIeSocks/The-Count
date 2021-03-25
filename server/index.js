const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../dist')))

app.use((req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at ${process.env.HOST}:${process.env.PORT}`)
})
