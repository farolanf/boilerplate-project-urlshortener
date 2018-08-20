const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  url: { type: String, required: true },
  shortUrl: Number
})

schema.index({ shortUrl: 1 })

const Shorturl = mongoose.model('Shorturl', schema)

module.exports = Shorturl