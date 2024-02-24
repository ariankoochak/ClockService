const http = require("http");
const { createTicket, getAllTickets, sendReplyTicket } = require("./controllers/tickets.controller");
const port = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const apiRoute = "/tickets";
    if(apiRoute === url && method === "POST"){
        createTicket(req,res)
    }
    else if(apiRoute === url && method === "GET"){
        getAllTickets(req,res)
    }
    else if(`${apiRoute}/replies` === url && method === "POST"){
        sendReplyTicket(req,res)
    }
});

server.listen(port, () => {
    console.log("\nserver running!!..");
    console.log(`for start,send request to http://localhost:${port}\n`);
});