const { errorHandler } = require("../controllers/errors.controller")

function errorMiddleware(err,req,res,next){
    errorHandler(res,(err.status || 500),(err.message || 'unknown server error'))
}

module.exports = {
    errorMiddleware
}