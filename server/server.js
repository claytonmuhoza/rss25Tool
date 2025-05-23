// server.js
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/proxy/lemonde', async (req, res) => {
  try {
    const response = await fetch('https://www.lemonde.fr/sciences/rss_full.xml')
    const data = await response.text()
    res.set('Content-Type', 'application/xml')
    res.send(data)
  } catch (error) {
    console.error('Erreur proxy:', error)
    res.status(500).send('Erreur proxy')
  }
})
app.get('/proxy/fonction-publique', async (req, res) => {
  try {
    const response = await fetch('https://www.fonction-publique.gouv.fr/flux-rss-actualites')
    const data = await response.text()
    res.set('Content-Type', 'application/xml')
    res.send(data)
  } catch (error) {
    console.error('Erreur proxy:', error)
    res.status(500).send('Erreur proxy')
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`✅ Proxy en écoute sur http://localhost:${PORT}/proxy/lemonde`)
})
