const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/', (req,res) => {
    res.send('Hello , This is Home Page')
})

//save data(Products) to the database
app.post('/products', async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.send(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//Fetch all Products
app.get('/products', async(req,res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Fetch products by id
app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params //deconstruct
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update Products by id
app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(400).json({message: `cannot find product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete Products by id
app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:`cannot find product with id ${id}`})
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//connection to database(MongoDb)
mongoose.connect('mongodb+srv://adwaithsivan200:<password>h@crudapi.ptdnpdh.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000,() => {
        console.log("App Running on Port 3000")
    })
    console.log('connected to MongoDb')
}).catch((error) => {
    console.log(error)
})