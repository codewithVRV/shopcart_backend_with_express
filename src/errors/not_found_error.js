const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class NotFoundError extends Error {

    constructor(resourceName, property, propertyValue) {
        const errorMessage = ` The resource: ${resourceName} with ${property} value ${propertyValue} not found.`
        super(errorMessage);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.reason = ReasonPhrases.BAD_REQUEST;
        this.errorMessage = errorMessage;
        this.name = "NotFoundError";

    }
}

module.exports = NotFoundError;