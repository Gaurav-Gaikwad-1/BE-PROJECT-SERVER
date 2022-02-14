const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const PatientHistory = require('./PatientHistory');

class Doctor extends Model{}

Doctor.init({
    doctor_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    clinic_id:{
        type: DataTypes.UUID,
        allowNull : false
    } ,
    name :{
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    phone :{
        type:DataTypes.STRING(128),
        allowNull: false,

    },
    email :{
        type:DataTypes.STRING(128),
        allowNull: false,
        unique : true,
        validate: {
            isEmail: true
        }
    },
    degree:{
        type:DataTypes.STRING(128),
        allowNull: false,

    },   
}, {
    sequelize,
    timestamps: false ,  
    modelName : 'doctor', 
})

Doctor.hasMany(PatientHistory,{foreignKey:"doctor_id"})
PatientHistory.belongsTo(Doctor,{foreignKey:"doctor_id",as:"doctorDetails"});  //patient is associated to patienthistory using an alias 'patientDetails'

module.exports = Doctor;