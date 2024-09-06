const express = require ('express')
const router = express.Router()
const Car = require ('../models/car.model.js')

//MIDDLEWARE
const getCar = async (req, res, next) => {
    let car;
    const { id } = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json (
            {
                message: 'El ID que proporciono no es valido'
            }
        )
    }

    try {
        car = await Car.findById(id)
        if(!car){
            return res.status(404).json
            (    
                {
                    message: `No se encontro un auto con el id ${id}`
                }
            )
        }
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            }
        )
    }
    
    res.car = car;
    next()
}


//Obtener todos los autos [GET]
router.get('/', async (req, res) => {
    try {
        const car = await Car.find();
        console.log('GET ALL', car)
        if(car.length === 0){
           return res.status(204).json([])
        }
        res.json(car)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Crear auto (recurso) [POST]
router.post('/', async (req, res) => {
    const {mark, model, year, mileage, price, patent} = req?.body
    if(!mark || !model || !year || !mileage || !price || !patent) {
        return res.status(400).json({message: 'Todos los campos son obligatorios'})
    }
    const car = new Car (
        {
            mark,
            model,
            year,
            mileage,
            price,
            patent
        }
    )
    try {
        const newCar = await car.save()
        console.log('NEW CAR', newCar)
        res.status(200).json(newCar)
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})

router.get('/:id', getCar, async (req, res) => {
    res.json(res.car)  
})

router.put('/:id', getCar, async (req, res) => {
    try {

        const car = res.car
        car.mark = req.body.mark || car.mark;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.mileage = req.body.mileage || car.mileage;
        car.price = req.body.price || car.price;
        car.patent = req.body.patent || car.patent;

        const updatedCar = await car.save()
        res.json(updatedCar)

    } catch (error) {
        res.status(400).json({
            message: error.message      
        })
    }
    
})

router.patch('/:id', getCar, async (req, res) => {
    if (!req.body.mark && !req.body.model && !req.body.year && !req.body.mileage && !req.body.price && !req.body.patent) {
        res.status(400).json({
            message: `Al menos uno de los campos debe ser enviado`
        })
    }

    try {

        const car = res.car
        car.mark = req.body.mark || car.mark;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.mileage = req.body.mileage || car.mileage;
        car.price = req.body.price || car.price;
        car.patent = req.body.patent || car.patent;

        const updatedCar = await car.save()
        res.json(updatedCar)

    } catch (error) {
        res.status(400).json({
            message: error.message      
        })
    }
    
})

router.delete('/:id', getCar, async (req, res) => {
    try {
        const car = res.car;
        await car.deleteOne({ 
            _id:car._id
        });
        res.json({
            message: `El libro ${car.model} se borro correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    } 
})

module.exports = router
//Obtener un auto
