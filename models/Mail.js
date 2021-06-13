const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    from : { type : String , required : true},
    to : { type : String },
    subject : { type : String, required: true },
    content : { type : String, required: true }
})

module.exports = mongoose.model('Mail', mailSchema);