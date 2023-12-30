const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const UnauthorizedError = require("../errors/unauthorized_error");

class CartService {

    constructor(respository) {
        this.respository = respository;
    }

    async updateCart(userId, cartId, productId, shouldAddProduct = true){
        try{
            const cart = await this.respository.getCart(cartId)
            console.log("carts details", cart)
            if(!cart) {
                throw new NotFoundError("Cart", "id", cartId)
            }
            if(cart.userId !== userId){
                throw new UnauthorizedError("You are not auhorized to do current operation.")
            }
            const response = await this.respository.updateCart(cartId, productId, shouldAddProduct)
            return response;
        }
        catch(error){
            if(error.name === "NotFoundError" || error.name === "UnauthorizedError"){
                throw error;
            }
            console.log("Category Service:-", error)
            throw new InternalServerError()
        }
    }
    
    
}


module.exports = CartService;
