const Car = require('./models/car')

const express = require('express') 
const dotenv= require('dotenv').config()
const app = express() 

app.use(express.static('public')) 
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose')

async function conntentToDB(){
    try{ 
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connection Successful')
    }
    catch(err){
        console.log('Error in Connection')
    }
}
conntentToDB()

const carsSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  price: Number,
})

const Car = mongoose.model('Car',carsSchema)

app.get('/',(req,res)=>{
    res.render('home.ejs')
})
app.get('/cars', async (req, res) => {
  const cars = await Car.find()
  res.render('cars/index', { cars })
})
app.get('/cars/:id',async(req,res)=>{
     console.log(req.params)
     const foundCar = await Car.findById(req.params.id)
     res.render('cars/car-details.ejs',{foundCar: foundCar}) 
})
 