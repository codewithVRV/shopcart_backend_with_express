const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const BadRequest = require("../errors/bad_request_error");
const errorResponse = require("../utils/error_response");

function createCategoryValidator(req, res, next) {
    if(!req.body.name) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Name")))
    }

    if(!req.body.description) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Description")))
    }
    if(!req.body.image) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("Image")))
    }

    

    // If everything looks good
    next();
}

module.exports = {
    createCategoryValidator
}