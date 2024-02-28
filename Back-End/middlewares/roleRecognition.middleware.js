const { errorHandler } = require("../controllers/errors.controller");
const model = require("../models/tickets.model");

async function roleRecognition(req,res,next){
    try {
        const user = await model.userAuthenticationById(req.headers.userid);
        if(user){
            req.userRole = user.role;
            next();
        }else{
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res,500,'internal server error')
    }
}

module.exports = {
    roleRecognition,
}