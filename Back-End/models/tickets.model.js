const { ObjectId } = require("mongodb");
const mongoDBconnection = require("../database/connection");

async function createTicket(ticket) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.insertOne(ticket);
    return new Promise((resolve, reject) => {
        resolve(result.acknowledged);
    });
}

async function employeeAuthenticator(id) {
    if (id.length !== 24) {
        return false;
    }
    const db = await new mongoDBconnection().getDBtunnel("Employees");
    const result = await db.findOne({ _id: new ObjectId(id) });
    return new Promise((resolve, reject) => {
        resolve(Boolean(result));
    });
}

async function repairmanAuthenticator(id) {
    if (id.length !== 24) {
        return false;
    }
    const db = await new mongoDBconnection().getDBtunnel("Repairmans");
    const result = await db.findOne({ _id: new ObjectId(id) });
    return new Promise((resolve, reject) => {
        resolve(Boolean(result));
    });
}

async function customerAuthenticator(id) {
    if (id.length !== 24) {
        return false;
    }
    const db = await new mongoDBconnection().getDBtunnel("Customers");
    const result = await db.findOne({ _id: new ObjectId(id) });
    return new Promise((resolve, reject) => {
        resolve(Boolean(result));
    });
}

async function getAllTickets() {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({}).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function getCustomerAllTickets(id) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({ customerID : id}).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function createReplyTicket(reply) {
    // console.log(reply);
    const db = await new mongoDBconnection().getDBtunnel("Replies");
    const result = await db.insertOne(reply);
    return new Promise((resolve, reject) => {
        resolve(result.acknowledged);
    });
}

async function closeTicket(ticketId) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    let result = await db.updateOne(
        { _id: new ObjectId(ticketId) },
        {
            $set: { isClose: true },
        }
    );
    return new Promise((resolve, reject) => {
        resolve(Boolean(result.modifiedCount));
    });
}

async function createFixingTicket(fixingTicket) {
    const db = await new mongoDBconnection().getDBtunnel("FixingTickets");
    const result = await db.insertOne(fixingTicket);
    return new Promise((resolve, reject) => {
        resolve(result.acknowledged);
    });
}

async function getClientData(id) {
    const db = await new mongoDBconnection().getDBtunnel("Customers");
    const result = await db.findOne({ _id: new ObjectId(id) });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function getAllFixingTicket() {
    const db = await new mongoDBconnection().getDBtunnel("FixingTickets");
    const result = await db.find({}).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function sendFixingResult(fixingTicketId,payload){
    const db = await new mongoDBconnection().getDBtunnel("FixingTickets");
    let result = await db.updateOne(
        { _id: new ObjectId(fixingTicketId) },
        {
            $set: payload,
        }
    );
    return new Promise((resolve, reject) => {
        resolve(Boolean(result.modifiedCount));
    });
}

async function authenticateClient(userName,password){
    const db = await new mongoDBconnection().getDBtunnel("Customers");
    const result = await db.findOne({
        CustomerUserName: userName,
        CustomerPassword : password,
    });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function authenticateEmployee(userName, password) {
    const db = await new mongoDBconnection().getDBtunnel("Employees");
    const result = await db.findOne({
        EmployeeUserName: userName,
        EmployeePassword: password,
    });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function authenticateRepairman(userName, password) {
    const db = await new mongoDBconnection().getDBtunnel("Repairmans");
    const result = await db.findOne({
        EmployeeUserName: userName,
        EmployeePassword: password,
    });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

const model = {
    createTicket,
    employeeAuthenticator,
    customerAuthenticator,
    repairmanAuthenticator,
    getAllTickets,
    createReplyTicket,
    closeTicket,
    createFixingTicket,
    getClientData,
    getAllFixingTicket,
    sendFixingResult,
    authenticateClient,
    authenticateEmployee,
    authenticateRepairman,
    getCustomerAllTickets,
};

module.exports = model;
