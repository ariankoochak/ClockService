const model = require("../models/tickets.model");
const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");

async function createTicket(req, res) {
    try {
        const data = req.body;
        console.log(data);
        const result = await model.createTicket({
            date: Date.now(),
            isClose: false,
            ...data,
        });
        if (result) {
            sendResult(res, 201, {
                message: "ticket created successfully",
            });
        } else {
            errorHandler(res, 502, "Bad Gateway");
        }
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
        const data = req.body;
        const [keyName, authenticationId] = Object.entries(req.headers)[0];
        let authenticationResult = null;
        if (keyName === "employeeid") {
            authenticationResult = await model.employeeAuthenticator(
                authenticationId
            );
        } else {
            authenticationResult = await model.customerAuthenticator(
                authenticationId
            );
        }
        if (authenticationResult) {
            const result = await model.createReplyTicket({
                date: Date.now(),
                ...data,
                senderID: authenticationId,
            });
            if (result) {
                sendResult(res, 201, {
                    message: "reply sended successfully",
                });
            } else {
                errorHandler(res, 502, "Bad Gateway");
            }
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function closeTicket(req, res) {
    try {
        const employeeId = req.headers.employeeid;
        const ticketId = req.headers.ticketid;

        const result = await model.employeeAuthenticator(employeeId);
        if (result) {
            const ticketIsChange = await model.closeTicket(ticketId);
            if (ticketIsChange) {
                sendResult(res, 201, { message: "ticket closed successfully" });
            } else {
                errorHandler(res, 412, "ticket-id is wrong");
            }
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function createFixingTicket(req, res) {
    try {
        const employeeId = req.headers.employeeid;
        const result = await model.employeeAuthenticator(employeeId);
        if (result) {
            const data = req.body;
            const {
                CustomerFirstName,
                CustomerLastName,
                PhoneNumber,
                Address,
            } = await model.getClientData(data.customerID);
            const result = await model.createFixingTicket({
                date: Date.now(),
                isDone: false,
                ...data,
                clientFullName: `${CustomerFirstName} ${CustomerLastName}`,
                clientAddress: Address,
                clientPhoneNumber: PhoneNumber,
            });
            if (result) {
                sendResult(res, 201, {
                    message: "fixing-ticket created successfully",
                });
            } else {
                errorHandler(res, 502, "Bad Gateway");
            }
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function getAllFixingTicket(req, res) {
    try {
        const [keyName, authenticationId] = Object.entries(req.headers)[0];
        let authenticationResult = null;
        if (keyName === "employeeid") {
            authenticationResult = await model.employeeAuthenticator(
                authenticationId
            );
        } else {
            authenticationResult = await model.repairmanAuthenticator(
                authenticationId
            );
        }
        if (authenticationResult) {
            const fixingTicket = await model.getAllFixingTicket();
            sendResult(res, 200, fixingTicket);
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function sendFixingResult(req, res) {
    try {
        const repairmanId = req.headers.repairmanid;
        const result = await model.repairmanAuthenticator(repairmanId);
        if (result) {
            const data = req.body;
                data = JSON.parse(data);
                const resultBody = data.resultBody;
                const result = await model.sendFixingResult(
                    data.fixingTicketId,
                    {
                        finishDate: Date.now(),
                        isDone: true,
                        resultBody,
                    }
                );
                if (result) {
                    sendResult(res, 201, {
                        message: "fixing result sent",
                    });
                } else {
                    errorHandler(res, 502, "Bad Gateway");
                }
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function getCustomerAllTickets(req, res) {
    try {
        const customerId = req.headers.customerid;
        const result = await model.customerAuthenticator(customerId);
        if (result) {
            const tickets = await model.getCustomerAllTickets(customerId);
            sendResult(res, 200, tickets);
        } else {
            errorHandler(res, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

const controller = {
    createTicket,
    getAllTickets,
    sendReplyTicket,
    closeTicket,
    createFixingTicket,
    getAllFixingTicket,
    sendFixingResult,
    getCustomerAllTickets,
};

module.exports = controller;
