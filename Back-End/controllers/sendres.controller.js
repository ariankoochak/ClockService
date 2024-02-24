function sendResult(res,statusCode,objectForSend){
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(
        JSON.stringify(objectForSend)
    );
    res.end();
}

module.exports = {
    sendResult,
}