const Doctor = require("../models/Doctor");
const asyncHandler = require('express-async-handler');


exports.addDoctor = asyncHandler(async (req, res) => {
    const clinic_id = req.clinic.clinic_id;
    const { name, email, phone, degree } = req.body;

    const doctor = await Doctor.create({
        clinic_id: clinic_id, name, phone, email, degree
    });

    if (doctor) {
        return res.status(201).json({
            doctor
        })
    } else {
        res.status(400);
        throw new Error("Invalid Input data");
    }
})

exports.getAllDoctors = asyncHandler(async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page); // eg http://localhost:5000/api/patients?page=1&size=5
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
    }

    const clinic_id = req.clinic.clinic_id;
    const doctors = await Doctor.findAndCountAll({
        where: { clinic_id: clinic_id },
        limit: size,                                 //limit our result set for a page
        offset: page * size                           //offset value indicates how many starting values to skip
    })
    if (doctors) {
        return res.status(200).send({
            content: doctors.rows,
            totalPages: Math.ceil(doctors.count / size)
        });
    } else {
        res.status(404);
        throw new Error("Data Not Found");
    }
})

exports.getDoctorByID = asyncHandler(async (req, res) => {
    const doctor_id = req.params.id // eg http://localhost:5000/api/doctors/:id

    // const clinic_id = req.clinic.clinic_id;
    const doctor = await Doctor.findOne({
        where: { doctor_id: doctor_id }
    })
    if (doctor) {
        // console.log(doctor.dataValues)
        return res.status(200).send({
            content: doctor.dataValues,
            message:"found"
        });
    } else {
        res.status(404);
        throw new Error("Data Not Found");
    }
})

exports.deleteDoctor = asyncHandler(async (req, res) => {
    const doctor_id = req.params.id;

    const doctor = await Doctor.destroy({ where: { doctor_id: doctor_id } });

    if (doctor) {
        return res.json({ message: 'Doctor deleted' });
    } else {
        res.status(404).json({
            message: 'Doctor Not Found'
        })
    }

})