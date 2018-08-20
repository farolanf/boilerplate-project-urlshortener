const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  url: { type: String, required: true }
})

const Shorturl = mongoose.model('Shorturl', schema)

module.exports = Shorturl