const express = require('express')
const app = express()
const port = 3000
const controller = require("./controllers/tickets.controller");
const authenticateController = require("./controllers/authenticate.controller");
const { errorMiddleware } = require('./utils/errorMiddleware');
const { notFoundMiddleware } = require('./utils/notFoundMiddleware');
const cors = require("cors");
const morgan = require('morgan');

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.post("/tickets", controller.createTicket);

app.get("/tickets",controller.getAllTickets);

app.get("/tickets/customer", controller.getCustomerAllTickets);

app.post("/tickets/replies",controller.sendReplyTicket);

app.post("/tickets/close",controller.closeTicket);

app.post("/tickets/fixing",controller.createFixingTicket);

app.get("/tickets/fixing",controller.getAllFixingTicket);

app.post("/tickets/fixing/done",controller.sendFixingResult);

app.get("/ticket/replies/all", controller.getTicketWithReplies);

app.get("/login/:role", authenticateController.authenticatingLogin);

app.use(notFoundMiddleware)

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log("\nserver running!!..");
    console.log(`for start,send request to http://localhost:${port}\n`);
})