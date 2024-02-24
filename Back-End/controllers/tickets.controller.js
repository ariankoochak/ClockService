const model = require("../models/tickets.model");
const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");

async function createTicket(req, res) {
    try {
        let data = "";
        req.on("data", (jsonDatas) => {
            data += jsonDatas.toString();
        });
        req.on("end", async () => {
            const result = await model.createTicket({
                date: Date.now(),
                isClose: false,
                ...JSON.parse(data),
            });
            if (result) {
                sendResult(res, 201, {
                    message: "ticket created successfully",
                });
            } else {
                errorHandler(res, 502, "Bad Gateway");
            }
        });
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function getAllTickets(req, res) {
    try {
        const employeeId = req.headers.employeeid;
        const result = await model.employeeAuthenticator(employeeId);
        if (result) {
            const tickets = await model.getAllTickets();
            sendResult(res, 200, tickets);
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function sendReplyTicket(req, res) {
    try {
        let data = "";
        const [keyName, authenticationId] = Object.entries(req.headers)[0];
        let authenticationResult = null;
        if (keyName === "employeeid"){
            authenticationResult = await model.employeeAuthenticator(authenticationId)
        }
        else{
            authenticationResult = await model.customerAuthenticator(authenticationId)
        }
        req.on("data", (jsonDatas) => {
            data += jsonDatas.toString();
        });
        req.on("end", async () => {
            if(authenticationResult){
                const result = await model.createReplyTicket({
                    date: Date.now(),
                    ...JSON.parse(data),
                });
                if (result) {
                sendResult(res, 201, {
                    message: "reply sended successfully",
                });
            } else {
                errorHandler(res, 502, "Bad Gateway");
            }
            }
            else{
                errorHandler(res, 401, "you are unauthorized");
            }
        });
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    sendReplyTicket,
};
