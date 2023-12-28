const BadRequest = require("../errors/bad_request_error");
const ConflictError = require("../errors/conflict_error");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const bcrypt = require("bcrypt");
const UnauthorizedError = require("../errors/unauthorized_error");
const { generateToken } = require("../utils/auth");
class UserService {

    constructor(respository) {
        this.respository = respository;
    }

    async createUser(userData) {
        try{
            const response = await this.respository.createUser(userData.email, userData.password);
            return response;
        }
        catch(error) {
            if(error.name === "SequelizeUniqueConstraintError"){
                throw new ConflictError("User", error.errors[0].message)
            }
            if(error.name === "SequelizeValidationError"){
                let propertiesHavingValidationIsseu = "";
                let reasons = [];
                error.errors.forEach((err) => {
                    propertiesHavingValidationIsseu += err.path += ", "
                    reasons.push(err.message)
                })
                throw new BadRequest(propertiesHavingValidationIsseu, true, reasons)
            }
            console.log("User Service:-", error)
            throw new InternalServerError()
        }
        
    }

    async getUsers() {
        try{
            const response = await this.respository.getUsers();
            return response;
        }
        catch(error) {
            console.log("User Service:-", error)
            throw new InternalServerError()
        }
        
    }

    async getUserByEmail(userData) {
        try{
            const user = await this.respository.getUserByEmail(userData.email);
            if(!user){
                console.log("UserService: ", userData.email, "not found")
                throw new NotFoundError("UserEmail", "email", userData.email)
            }
            const doesPasswordMatch = bcrypt.compareSync(userData.password, user.password);
            if(!doesPasswordMatch){
                throw new UnauthorizedError()
            }
            return generateToken({email: user.email, id: user.id})
        }
        catch(error) {
            if(error.name === "NotFoundError" || error.name === "UnauthorizedError"){
                throw error;
            }
            console.log("User Service:-", error)
            throw new InternalServerError()
        }
    }

    async getUser(userId) {
        try{
            const response = await this.respository.getUser(userId);
            if(!response) {
               throw new NotFoundError("User", "id", userId) 
            }
            return response;
        }
        catch(error) {
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("User Service:-", error)
            throw new InternalServerError()
        }
       
    } 

    async destroyUser(userId) {
        try{
            const response = await this.respository.destroyUser(userId);
            if(!response) {
                throw new NotFoundError("User", "id", categoryId) 
             }
            return response;
        }
        catch(error) {
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("User Service:-", error)
            throw new InternalServerError()
        }
        
    }
    
}


module.exports = UserService
