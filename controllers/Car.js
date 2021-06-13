const Car = require('../models/Car');

exports.addCar = (req, res, next) => {
    console.log(req.body);
    const car = req.body;
    const newCar = new Car(car)
    newCar.save().then(result => {
        res.status(200).json({
            message : 'car Added successfully',carId : result._id
        })
    }).catch(err => {
        err.statusCode = 403;
        throw err
        
    })

}
exports.getCars = (req,res,next) => {
    const pageNumber = req.params.page;
    const itemsNumber = 6;
    Car.find()
    .skip((pageNumber-1)*itemsNumber)
    .limit(itemsNumber)
    .then(cars => {
        res.status(200).json({cars: cars});
    }).catch(err => {
        err.statusCode = 500;
        throw err
    })
}

exports.deleteCar = (req, res, next) => {
    carId = req.params.carId;
    Car.findById(carId).then(car => {
        if(!car){
            const err = new Error('Car not found');
            err.statusCode = 404;
            throw err;
        }
        // if(!req.user.admin)
        // { 
        //     const err = new Error('you are not authorized to delete');
        //     err.statusCode=403;
        //     throw err;
        // }
        return Car.findByIdAndRemove(carId)
    }).then(result => {
        res.status(200).json({message: 'delete car successfully'});
    })
    .catch(err => {
        err.statusCode = 500;
        throw err;
    })
}