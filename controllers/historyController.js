const PatientHistory = require("../models/PatientHistory");
const asyncHandler = require('express-async-handler');
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.addDiagnosisHistory = asyncHandler(async(req,res) => {
    const patient_id = req.params.patientId;
    const doctor_id = req.params.doctorId;
    const { diagnosis,symptoms,severity,reportUrl } = req.body;

    const history = await PatientHistory.create({
        patient_id,doctor_id,diagnosis,symptoms,severity,reportUrl
    })
   
    if(history){
       return res.send(history);
    }else{
       res.status(404).json({
           message:'history Not created'
       })
    }
    
})
/*
    Helper variables we need this data to be used down in api/histor/doctor/:id route also so we 
    created variable to avoid duplicate code
*/
const patientModel = {
    model: Patient,                 //model name
    as:"patientDetails",           //association name
    attributes:["name","phone","email","age","gender","bloodGroup","weight"]    //we explicitly specify values we want,otherwise there is no need to use 'attributes' property
}
const doctorModel = {
    model: Doctor,
    as:"doctorDetails",
    attributes:["name","phone","email","degree"]
}

exports.getPatientHistoryById = asyncHandler(async(req,res) => {
    const patient_id = req.params.id;

    const patients = await PatientHistory.findAndCountAll({ 
        where:{patient_id:patient_id},
        include:[
            patientModel,
            doctorModel,
        ]
    });
    if(patients){
        res.send(patients);
    }else{
         res.status(404).json({
           message:'Patient History Not Found'
       });
    }
})

exports.getPatientHistoryByDoctor = asyncHandler(async(req,res) => {
    const doctor_id = req.params.id;

    const patients = await PatientHistory.findAndCountAll({ 
        where:{doctor_id:doctor_id},
        include:[
            patientModel,
            doctorModel,
        ]
    });
    if(patients){
        res.send(patients);
    }else{
         res.status(404).json({
           message:'Patient History Not Found'
       });
    }
})

