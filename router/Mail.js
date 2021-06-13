const express = require('express');
const route = express.Router();
const mailController = require('../controllers/Mail');

route.post('/',mailController.sendMail);


module.exports=route;