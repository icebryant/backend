const express = require('express')
const app = express()
// var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/www'))
// app.use(morgan('short'))
app.use(express.json())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

app.get('/api/notes', (req, res) => {
 res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
    const id = parseFloat(req.params.id)
    console.log(id)
    const note = notes.find((note) => note.id === id)
    if (note) {
        res.json(note)
    } else { 
        res.send('404 not found')
        res.status(404).end()
    }
})
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
    res.json(notes)
  res.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
    

  const note = request.body
  note.id = maxId + 1

  notes = notes.concat(note)
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})