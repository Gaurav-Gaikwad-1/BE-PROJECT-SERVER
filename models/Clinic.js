const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class Clinic extends Model {}

Clinic.init({

    clinic_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    password :{
        type:DataTypes.STRING(128),
        allowNull: false,

    },
    address :{
        type:DataTypes.STRING,
        allowNull: false,

    },
},{
    sequelize,
    timestamps: false ,  
    modelName : 'clinic',
    indexes: [{ unique: true, fields: ['email'] }] ,                     
})

module.exports = Clinic;