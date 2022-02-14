const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./Patient');

class PatientHistory extends Model{}

PatientHistory.init({
    history_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    patient_id:{
        type: DataTypes.UUID,
        allowNull : false,
        references: {
            model: Patient, 
            key: 'patient_id',
         }
    },
    doctor_id:{
        type: DataTypes.UUID,
        allowNull : false,
        references: {
            model: Patient, 
            key: 'patient_id',
         }
    } ,
    date :{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,    
    },
    diagnosis :{
        type:DataTypes.STRING(128),
        allowNull: false,
    },
    symptoms :{
        type:DataTypes.STRING,
        allowNull: false,
    },
    severity :{
        type:DataTypes.STRING(64),
        allowNull: false,
    },
    reportUrl :{
        type:DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: false ,  
    modelName : 'patienthistory', 
    freezeTableName: true
})

module.exports = PatientHistory;
