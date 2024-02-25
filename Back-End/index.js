const http = require("http");
const controller = require("./controllers/tickets.controller");
const authenticateController = require("./controllers/authenticate.controller");

const port = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;
    const apiRoute = "/tickets";
    if (apiRoute === url && method === "POST") {
        controller.createTicket(req, res);
    } else if (apiRoute === url && method === "GET") {
        controller.getAllTickets(req, res);
    } else if (`${apiRoute}/replies` === url && method === "POST") {
        controller.sendReplyTicket(req, res);
    } else if (`${apiRoute}/close` === url && method === "POST") {
        controller.closeTicket(req, res);
    } else if (`${apiRoute}/fixing` === url && method === "POST") {
        controller.createFixingTicket(req, res);
    } else if (`${apiRoute}/fixing` === url && method === "GET") {
        controller.getAllFixingTicket(req, res);
    } else if (`${apiRoute}/fixing/done` === url && method === "POST") {
        controller.sendFixingResult(req, res);
    }
    const loginRoute = "/login";
    if (
        (`${loginRoute}/client` === url ||
            `${loginRoute}/operator` === url ||
            `${loginRoute}/repairman` === url) &&
        method === "GET"
    ) {
        authenticateController.authenticatingLogin(req, res);
    }
});

server.listen(port, () => {
    console.log("\nserver running!!..");
    console.log(`for start,send request to http://localhost:${port}\n`);
});