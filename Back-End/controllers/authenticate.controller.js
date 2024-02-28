const model = require("../models/tickets.model");
const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");

async function authenticatingLogin(req, res) {
    try {
        const result = await model.userAuthenticationByUsernamePassword(req.headers.username,req.headers.password)
        if(result){
            sendResult(res,200,result)
        }
        else{
            errorHandler(res,401,'wrong username or password')
        }
    } catch (error) {
        errorHandler(res,500,'server error')
    }
}

const authenticateController = {
    authenticatingLogin,
}

module.exports = authenticateController