const express = require("express");
const app = express();
const {errorHandler} = require('./middleware/errorMiddleware');
const sequelize = require('./config/db');
const dotenv = require('dotenv');

                  
app.use(express.json())             //this allows to accept JSON data in the body
app.use(express.urlencoded({ extended: false })); 

 
dotenv.config();

sequelize.sync().then(() => {
    console.log("Database is connected & ready");
})

//require routes handlers
const clinicRoutes = require('./routes/clinicRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

//routes
app.use('/api/clinics', clinicRoutes);
app.use('/api/patients',patientRoutes);
app.use('/api/doctors',doctorRoutes);

//middleware
app.use(errorHandler);

app.listen(5000,() => console.log("server is running on port 5000"));