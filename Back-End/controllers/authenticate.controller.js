const model = require("../models/tickets.model");
const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");

async function authenticatingLogin(req, res) {
    try {
        const userName = req.headers.username;
        const password = req.headers.password;
        const role = req.url.split('/')[2];
        let result = null
        switch(role){
            case 'client':
                result = await model.authenticateClient(userName,password);
                break;
            case 'operator':
                result = await model.authenticateEmployee(userName, password);
                break;
            case 'repairman':
                result = await model.authenticateRepairman(userName, password);
                break;
            default:
                errorHandler(res,400,'bad request')
        }
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