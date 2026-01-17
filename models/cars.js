const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  price: Number,
})

module.exports = mongoose.model('Car', carsSchema)
