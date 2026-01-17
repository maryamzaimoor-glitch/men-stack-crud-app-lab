// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require('morgan')

const Car = require('./models/cars')

// ✅ view engine MUST be before routes
app.set('view engine', 'ejs')

app.use(express.static('public')) // my app will serve all static files from public folder
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

async function connectToDB() { //connection to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to Database")
  } catch (error) {
    console.log("Error Occured", error)
  }
}

connectToDB() // connect to database

// Routes go here
app.get('/', (req, res) => {
  res.render('home.ejs')
})

// ✅ INDEX (matches your file all-cars.ejs)
app.get('/cars', async (req, res) => {
  const cars = await Car.find()
  res.render('cars/all-cars', { cars })
})

// ✅ NEW
app.get('/cars/new', (req, res) => {
  res.render('cars/new')
})

// ✅ CREATE
app.post('/cars', async (req, res) => {
  await Car.create(req.body)
  res.redirect('/cars')
})

// ✅ SHOW (matches your file car-details.ejs)
app.get('/cars/:id', async (req, res) => {
  const foundCar = await Car.findById(req.params.id)
  res.render('cars/car-details', { foundCar })
})

// ✅ EDIT PAGE (matches your file update.ejs)
app.get('/cars/:id/edit', async (req, res) => {
  const foundCar = await Car.findById(req.params.id)
  res.render('cars/update', { foundCar })
})

// ✅ UPDATE (using POST instead of PUT)
app.post('/cars/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body)
  res.redirect(`/cars/${req.params.id}`)
})

// ✅ DELETE (using POST instead of DELETE)
app.post('/cars/:id/delete', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id)
  res.redirect('/cars')
})

app.listen(3000, () => {
  console.log('App is working')
}) // Listen on Port 3000
