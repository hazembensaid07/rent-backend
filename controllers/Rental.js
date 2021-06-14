const Rental = require('../models/Rental');
const Car = require('../models/Car');
const crypto = require("crypto");
const stripe = require('stripe')('sk_test_51IuQbSCxbz7I0xpYMwZ4jdwVYHj0UAiK8Hoeu1z8XotIs6jTqz1DZ3B26Ow89agnUxP3YD2HLDyyAppYdCl7i6rM00S8UgoUbf');
exports.getRent = (req, res, next) => {
    if(req.user.admin)
    { 
        Rental.find().then(result => {
            res.status(200).json({rentlas : result});
        }).catch((err) => {
            err.statusCode = 500;
            throw err;
        })  
    }
    Rental.find({user : req.user._id}).then(result => {
        res.status(200).json({rentlas : result});
    }).catch((err) => {
        err.statusCode = 500;
        throw err;
    })

};




exports.payment=async  (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          err.statusCode = 500;
          throw err;
        }
        const token = buffer.toString('hex');
    if(!req.user)
    {
        const err = new Error('you are not authorized');
        err.statusCode = 403;
        throw err;
    }
    const carId = req.body.carId;
    const start_rental = Date.parse(req.body.start_rental);
    const end_rental = Date.parse(req.body.end_rent);
    const client = req.user;
    let sumPrice;
    const nbOfDays = Math.round((start_rental.getTime()-end_rental.getTime())/(1000*3600*24));
    let car
    Car.findById(carId).then(carDoc => {
        if(!carDoc)
        {
            const err = new Error('no car For this id');
            err.statusCode = 404;
            throw err;
        }
        car = carDoc;
        sumPrice = (carDoc.price / 7)* nbOfDays;
        const rental = new Rental({
            car : carDoc._id,
            start_rental : start_rental,
            end_rental : end_rental,
            price : (carDoc.price / 7)* nbOfDays,
            user : client._id,
            token : token

        });
        return rental.save();

    }).then(result => {
        return stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            line_items : [{ 
                name : car.model,
                description : car.description,
                amount : (car.price / 7)* nbOfDays,
                currency : 'usd',
                quantity : nbOfDays
            }],
            success_url : req.protocol + '://localhost:4200/rent/checkout/success',
            cancel_url : req.protocol + '://localhost:4200/rent/checkout/cancel'
          })
    })
    .then(session => {
        res.status(200).json({
          car : car,
          start_rental : start_rental,
          end_rental : end_rental,
          price : sumPrice,
          sessionId : session.id
        })
    })
    .catch(err => {
        err.statusCode = 500;
        throw err;
    })
});
};

exports.payementSuccess = (req,res,next) => {
    tokenParams = req.params.token;
    Rental.findOne({token: tokenParams}).then(rent => {
        if(!rent){
            const error = new Error('bad token');
            error.statusCode = 500;
            throw error;
        }
        rent.token = undefined;
        rent.pay = true;
        return rent.save();
    }).then(res => {
        // res.status(200).json({msg : 'pay successful'})
        res.render('payementSuccess');
    })
    .catch(err => {
        err.statusCode = 500;
          throw err;
    })
}





