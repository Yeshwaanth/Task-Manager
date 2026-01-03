const mongoose = require('mongoose')
const mongoURI = require('./env')

const connectDB = async () => {
    await mongoose.connect(mongoURI)
    console.log('MongoDB connected')
}

module.exports = connectDB
