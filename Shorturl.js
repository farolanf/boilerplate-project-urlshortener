const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const schema = new mongoose.Schema({
  url: { type: String, required: true },
  shortUrl: Number
})

schema.plugin(AutoIncrement, { inc_field: 'shortUrl' })

const Shorturl = mongoose.model('Shorturl', schema)

module.exports = Shorturl