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