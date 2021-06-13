const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RentalSchema =new Schema({
 car : {
     type :Schema.Types.ObjectId ,
     required : true,
     ref : 'Car'
 },
 start_rental : {
     type: Date,
     required : true
 },
 end_rental : {
    type: Date,
    required : true
},
price : {
    type: Number,
    required : true
},
user : { type : Schema.Types.ObjectId , required : true, ref : 'User' },

})

module.exports= mongoose.model('Rental',rentalSchema);