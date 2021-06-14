const express = require('express');
const route = express.Router();
const rentController = require('../controllers/Rental');

route.get('/get',rentController.getRent);
route.post('/payement',rentController.payment);








module.exports =route ;