
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {UserRepository, CartRepository} = require("../repositories/index")
const UserService = require("../services/user_service");
const errorResponse = require("../utils/error_response");
const { NODE_ENV } = require("../config/server_config");


const userService = new UserService(new UserRepository(), new CartRepository());


async function createUser (req, res) {
    try{
        const response = await userService.createUser(req.body);
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: ReasonPhrases.OK + " User",
                    data: response
        });
    }

    catch (error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }
}
async function getUserByEmail (req, res) {
    try{
        const response = await userService.getUserByEmail(req.body);
        res.cookie("token", response, {httpOnly: true, maxAge: 7*24*60*60*1000, secure: NODE_ENV == "production"})
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: ReasonPhrases.OK + " User Email",
                    data: (NODE_ENV == "production") ? true : response
        });
    }

    catch (error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }
}

module.exports = {
    createUser,
    getUserByEmail,
}