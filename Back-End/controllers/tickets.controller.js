const model = require("../models/tickets.model");

const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");

async function createTicket(req, res) {
    try {
        if (req.userRole === "client" || req.userRole === "operator") {
            const data = req.body;
            const result = await model.createTicket({
                date: Date.now(),
                isClose: false,
                senderId: req.headers.userid,
                senderRole: req.userRole,
                ...data,
            });
            if (result) {
                sendResult(res, 201, {
                    message: "ticket created successfully",
                });
            } else {
                errorHandler(res, 502, "Bad Gateway");
            }
        } else {
            errorHandler(req, 401, "you are unauthorized");
        }
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function getAllTickets(req, res) {
    try {
        if (req.userRole === "operator") {
             let tickets = null
            if(req.headers.tickettype === 'clientToOperator'){
               tickets = await model.getAllTicketsBySenderRole('client')
            }
            else if(req.headers.tickettype === 'operatorToRepairman'){
               tickets = await model.getAllTicketsBySenderRole("operator");
            }
            else{
                return errorHandler(res,412,'bad request')
            }
            if(tickets !== null)
                sendResult(res, 200, tickets);
        } else if (req.userRole === "client") {
            const tickets = await model.getAllTicketsBySenderId(
                req.headers.userid
            );
            sendResult(res, 200, tickets);
        } else if (req.userRole === "repairman") {
            const tickets = await model.getAllTicketsBySenderRole("operator");
            sendResult(res, 200, tickets);
        } else errorHandler(res, 401, "you are unauthorized");
    } catch (error) {
        console.log(error);
        errorHandler(res, 500, "server error");
    }
}

async function sendReplyTicket(req, res) {
    try {
        const data = req.body;
        if (req.userRole) {
            const result = await model.createReplyTicket({
                date: Date.now(),
                ...data,
                senderId: req.headers.userid,
                senderRole: req.userRole,
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
        if (req.userRole === "operator") {
            const ticketIsChange = await model.closeTicket(
                req.headers.ticketid
            );
            if (ticketIsChange) {
                sendResult(res, 204, { message: "ticket closed successfully" });
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

async function getTicketWithReplies(req, res) {
    try {
        if (req.userRole) {
            const ticketId = req.headers.ticketid;
            const mainTicket = await model.getTicketById(ticketId);
            if (mainTicket) {
                const replies = await model.getAllTicketReplies(ticketId);
                const data = [...mainTicket, ...replies];
                sendResult(res, 200, data);
            } else {
                errorHandler(res, 404, "ticket not found");
            }
        }
        else
            errorHandler(res, 401, "you are unauthorized");
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
    getTicketWithReplies,
};

module.exports = controller;
