const Rental = require('../models/Rental')
exports.getRent = (req, res, next) => {
    Rental.find({user : req.user._id}).then(result => {
        res.status(200).json({rentlas : result});
    }).catch((err) => {
        err.statusCode = 500;
        throw err;
    })

}