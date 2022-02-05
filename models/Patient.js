const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/db');

class Patient extends Model{}

Patient.init({
    patient_id:{
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
    age :{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    gender :{
        type:DataTypes.STRING(64),
        allowNull: false,
    },
    bloodGroup :{
        type:DataTypes.STRING(64),
        allowNull: false,
    },
    weight :{
        type:DataTypes.TINYINT,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: false ,  
    modelName : 'patient', 
})

module.exports = Patient;