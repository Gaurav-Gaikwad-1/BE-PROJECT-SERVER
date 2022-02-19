const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Clinic = require('../models/Clinic');
const { TokenExpiredError } = require('jsonwebtoken');

exports.protect = asyncHandler(async(req,res,next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{

            token = req.headers.authorization.split(' ')[1];     //req.headers.authorization.split(' ') ===>  ['Bearer','eyznjnxkdjlfnjkdnfjkdnfdndfdfdfd']
            // console.log(token);

            const decoded = jwt.verify(token,process.env.JWT_SECRET);    //decoded now contains ===> { id: '5f91d31d62e5fc46e8f6f0f5', iat: 1609829806, exp: 1612421806 }

            // console.log(decoded);
            req.clinic = await Clinic.findOne({ where: { clinic_id: decoded.id}}) //here we put all of user's data except password in this req.user which will have access to in all of our routes i.e protected routes
            if(req.clinic == null){
                return res.send("Invalid Token, Please Login again");
            }
            next();

        } catch(error){
            res.status(400).send('Not Authorized, Token failed');
        }
    }

    if(!token){
        res.status(400).send('Not Authorized,no token');
    }
});