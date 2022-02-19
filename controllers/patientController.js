const Patient = require("../models/Patient");
const asyncHandler = require('express-async-handler');


exports.addPatient = asyncHandler(async(req,res) => {
    const clinic_id = req.clinic.clinic_id;
    const {name,email,phone,age,gender,bloodgroup,weight} = req.body;

    console.log(req.body)

    const patient = await Patient.create({
        clinic_id:clinic_id,name,phone,email,age,gender,bloodGroup:bloodgroup,weight
    });

    if(patient){
        res.status(201).json({
            patient
        })
    }else{
        res.status(400);
        throw new Error("Invalid Input data");
    }
})

exports.getAllPatients = asyncHandler(async(req,res) => {
    // const pageAsNumber = Number.parseInt(req.query.page); // eg http://localhost:5000/api/patients?page=1&size=5
    // const sizeAsNumber = Number.parseInt(req.query.size);
    
    // let page=0;
    // if(!Number.isNaN(pageAsNumber) && pageAsNumber> 0){
    //     page = pageAsNumber;
    // }

    // let size = 10;
    // if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber<10){
    //     size = sizeAsNumber;
    // }
    
    const clinic_id = req.clinic.clinic_id;
    const patients = await Patient.findAndCountAll({
        where: { clinic_id: clinic_id },
        // limit:size,                                 //limit our result set for a page
        // offset: page*size                           //offset value indicates how many starting values to skip
    })
    if(patients){
        return res.status(200).send({
          content: patients.rows,
        //   totalPages: Math.ceil(patients.count / size)
    });
    }else{
        res.status(404);
        throw new Error("Patients Not Found");
    }
})

exports.deletePatient = asyncHandler(async(req,res) => {
    const patient_id = req.params.id;
   
    const patient = await Patient.destroy({ where : { patient_id: patient_id } });
   
    if(patient){
       return res.json({ message: 'Patient deleted'});
    }else{
       res.status(404).json({
           message:'Patient Not Found'
       })
    }
    
})

exports.getPatientByID = asyncHandler(async (req, res) => {
    const patient_id = req.params.id // eg http://localhost:5000/api/doctors/:id

    // const clinic_id = req.clinic.clinic_id;
    const patient = await Patient.findOne({
        where: { patient_id: patient_id }
    })
    if (patient) {
        // console.log(patient.dataValues)
        return res.status(200).send({
            content: patient.dataValues,
            message:"found"
        });
    } else {
        res.status(404);
        throw new Error("Data Not Found");
    }
})