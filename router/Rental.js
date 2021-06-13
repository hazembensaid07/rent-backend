const express = require('express');
const route = express.Router();
const rentController = require('../controllers/Rental');

route.get('/get',rentController.getRent);








module.exports =route ;