const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const url = `mongodb+srv://admin:${password}@cluster0.z6top.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note