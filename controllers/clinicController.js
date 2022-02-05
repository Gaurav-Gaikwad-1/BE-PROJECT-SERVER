const Clinic = require("../models/Clinic");
const {ClinicNotFound} = require('../middleware/errorMiddleware');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.authClinic = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    const clinic = await Clinic.findOne({ where : { email: email }});
   
    if(clinic && await bcrypt.compare(password,clinic.password)){
        return res.status(200).json({
            clinic_id: clinic.clinic_id, 
            name: clinic.name,
            phone: clinic.phone,
            email: clinic.email,
            address: clinic.address,
            token: generateToken(clinic.clinic_id)
        })
        
    }else{
        res.status(404)
        throw new Error('Invalid Email or Password');
     }
})
  
exports.registerClinic = asyncHandler( async (req,res) => {
    const {name,phone,email,password,address} = req.body;

    const clinicExists = await Clinic.findOne({ where :{ email:email} });

    if(clinicExists){
        return res.status(400).json({
            message: 'Clinic with same email id already exists'
        });
        //throw new Error('Clinic with same email id already exists');      
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const clinic = await Clinic.create({ name,phone,email,password:hashedPassword,address});

    if(clinic){
        return res.status(201).json({
            clinic_id: clinic.clinic_id, 
            name:clinic.name,
            phone: clinic.phone,
            email:clinic.email,
            address: clinic.address,
            token: generateToken(clinic.clinic_id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid Input data');
    }
})

exports.getAllClinics = asyncHandler( async(req,res) => {
    const clinics = await Clinic.findAll();
    res.send(clinics);
})

exports.getClinicProfile = asyncHandler(async(req,res,next)=>{
    // const requestedId = req.params.id;
    const requestedId = req.clinic.clinic_id;
    const clinic = await Clinic.findOne({ where : { clinic_id: requestedId } });
    if(clinic){
        return res.send(clinic);
    }else{
        throw new ClinicNotFound();
    }
        
})

exports.deleteClinic = asyncHandler( async(req,res) => {
    const requestedId = req.clinic.clinic_id;
    const clinic = await Clinic.destroy({ where : { clinic_id: requestedId } });
    if(clinic){
       return res.json({ message: 'Clinic deleted'});
    }else{
        throw new ClinicNotFound();
    }
})
