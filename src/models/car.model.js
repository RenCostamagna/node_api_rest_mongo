const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
    {
        mark: String,
        model: String,
        year: String,
        mileage: String,
        price: String,
        patent: String,
    }
)

module.exports = mongoose.model('Car', carSchema)