const express = require('express')

const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, '../dist')))

app.use((req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at http://localhost:${port}`)
})
