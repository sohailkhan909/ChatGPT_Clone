const errorResponse = require('../utills/errorResponse');


const errorHandler = (err, req, res, next) => {

    let error = { ...err }

    error.message = error.message

    if (err.name === 'castError') {
        const message = 'Resource Not Found'
        error = new errorResponse(message, 404)
    }
    if (err.code === 11000) {
        const message = 'Duplicate field value entered'
        error = new errorResponse(message, 404)
    }
      if (err.name === 'validationError') {

        const message = Object.values(err.errors).map((val)=>val.message);

        error = new errorResponse(message, 404)

        res.status({
            success: false,
            error:err.message || 'Server Error'
        })
    }

}


module.exports = errorHandler