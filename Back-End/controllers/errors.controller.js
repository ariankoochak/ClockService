
function errorHandler(res,statusCode,messageText){
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: messageText }));
    res.end();
}
module.exports = {
    errorHandler,
};
