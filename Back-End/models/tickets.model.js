const { ObjectId } = require("mongodb");
const mongoDBconnection = require("../database/connection");

async function getTicketById(id){
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({ _id: new ObjectId(id) }).toArray();
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

async function getClientData(id) {
    const db = await new mongoDBconnection().getDBtunnel("Customers");
    const result = await db.findOne({ _id: new ObjectId(id) });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}


async function userAuthenticationByUsernamePassword(username,password){
    const db = await new mongoDBconnection().getDBtunnel("Users");
    const result = await db.findOne({
        userName: username,
        password: password,
    });
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function userAuthenticationById(id) {
    const db = await new mongoDBconnection().getDBtunnel("Users");
    const result = await db.findOne({_id : new ObjectId(id)});
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function createTicket(ticket) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.insertOne(ticket);
    return new Promise((resolve, reject) => {
        resolve(result.acknowledged);
    });
}

async function getAllTicketsBySenderRole(senderRole) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({ senderRole: senderRole }).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function getAllTicketsBySenderId(senderId) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({ senderId: senderId }).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function getAllTicketReplies(ticketId) {
    const db = await new mongoDBconnection().getDBtunnel("Replies");
    const result = await db.find({ ticketID: ticketId }).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

const model = {
    createTicket,
    getAllTicketsBySenderRole,
    createReplyTicket,
    closeTicket,
    getClientData,
    getTicketById,
    getAllTicketReplies,
    userAuthenticationById,
    userAuthenticationByUsernamePassword,
    getAllTicketsBySenderId,
};

module.exports = model;
