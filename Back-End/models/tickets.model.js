const mongoDBconnection = require("../database/connection");


async function createTicket(ticket) {
    const db = await new mongoDBconnection().getDBtunnel("Tickets");
    const result = await db.insertOne(ticket);
    return new Promise((resolve, reject) => {
        resolve(result.acknowledged);
    });
}

const model = {
    createTicket,
}

module.exports = model;