const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { getMaxListeners } = require('../models/Car');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth  : {
        api_key : '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'
    }
}))

exports.sendMail = (req,res,next) => {
    const sender = req.body.email;
    const username = req.body.username;
    const content = req.body.content;
    try {
    transporter.sendMail({
        to : 'rcar.community@gmail.com',
        from : 'rcar.community@gmail.com',
        subject : 'mail from visitor',
        html : `<h1> from ${sender}, M/Ms ${username} </h1>
                 <p> ${content}</p> `
    })
    res.status(200).json({msg : 'mail send successfully'});
    }catch(err ){
        err.statusCode = 500;
        throw err

    }

}