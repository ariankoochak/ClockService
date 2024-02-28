const express = require('express')
const app = express()
const port = 3000
const controller = require("./controllers/tickets.controller");
const authenticateController = require("./controllers/authenticate.controller");
const { errorMiddleware } = require('./utils/errorMiddleware');
const { notFoundMiddleware } = require('./utils/notFoundMiddleware');
const cors = require("cors");
const morgan = require('morgan');
const { roleRecognition } = require('./middlewares/roleRecognition.middleware');

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.get("/login", authenticateController.authenticatingLogin);

app.use(roleRecognition)

app.post("/tickets", controller.createTicket);

app.get("/tickets",controller.getAllTickets);

app.post("/tickets/replies",controller.sendReplyTicket);

app.post("/tickets/close",controller.closeTicket);

app.get("/ticket/replies/all", controller.getTicketWithReplies);


app.use(notFoundMiddleware)

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log("\nserver running!!..");
    console.log(`for start,send request to http://localhost:${port}\n`);
})