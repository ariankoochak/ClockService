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
    if(id.length !== 24){
        return false
    }
    const db = await new mongoDBconnection().getDBtunnel("Employees");
    const result = await db.findOne({_id : new ObjectId(id)});
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

async function getAllTickets(){
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.find({}).toArray();
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}

async function createReplyTicket(reply){
    // console.log(reply);
     const db = await new mongoDBconnection().getDBtunnel("Replies");
     const result = await db.insertOne(reply);
     return new Promise((resolve, reject) => {
         resolve(result.acknowledged);
     });
}

const model = {
    createTicket,
    employeeAuthenticator,
    customerAuthenticator,
    getAllTickets,
    createReplyTicket,
};

module.exports = model;