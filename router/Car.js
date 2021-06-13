const express = require('express');
const route = express.Router();
const carController = require('../controllers/Car');

route.post('/addCar',carController.addCar);
route.get('/cars/:carId',carController.getCars);
route.delete('/car/:carId',carController.deleteCar);





module.exports =route ;