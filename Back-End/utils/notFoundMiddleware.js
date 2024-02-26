const { errorHandler } = require("../controllers/errors.controller");

function notFoundMiddleware(req, res,next) {
    errorHandler(res, 404, `not found this path=> ${req.url}`);
}

module.exports = {
    notFoundMiddleware,
};
