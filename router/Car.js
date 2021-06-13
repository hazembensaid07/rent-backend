const express = require('express');
const route = express.Router();
const carController = require('../controllers/Car');

route.post('/addCar',carController.addCar);
route.get('/cars',carController.getCars);





module.exports =route ;