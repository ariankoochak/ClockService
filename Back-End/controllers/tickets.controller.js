const model = require("../models/tickets.model");
const { errorHandler } = require("./errors.controller");
const { sendResult } = require("./sendres.controller");


async function createTicket(req,res){
        try {
            let data = "";
            req.on("data", (jsonDatas) => {
                data += jsonDatas.toString();
            });
            req.on("end", async () => {
                const result = await model.createTicket({
                    date : Date.now(),
                    isClose : false,
                    ...JSON.parse(data),
                })
                if(result){
                    sendResult(res,201,{message : "ticket created successfully"})
                }
                else{
                    errorHandler(res,502,'Bad Gateway')
                }
            });
        } catch (error) {
            console.log(error);
            errorHandler(res,500,"server error")
        }
}


module.exports = {
    createTicket
}