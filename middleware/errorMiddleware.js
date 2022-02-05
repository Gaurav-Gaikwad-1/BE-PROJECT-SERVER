
const errorHandler = (err,req,res,next) => {
    //const statusCode = err.statusCode === 200 ? 500 : res.statusCode ;
    res.status(res.statusCode).json({
        message: err.message,
        path: req.originalUrl
    })
}


function ClinicNotFound(){
    this.status = 404;
    this.message = 'Clinic Not Found'
}

module.exports = { ClinicNotFound, errorHandler  }