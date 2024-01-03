const { StatusCodes } = require('http-status-codes');

const CartService = require("../services/cart_service")
const {CartRepository} = require('../repositories/index');
const errorResponse = require('../utils/error_response');

const cartService = new CartService(new CartRepository());

async function updateCart(req, res) {

    try {
        const shouldAddProduct = (req.body.shouldAddProduct == true || req.body.shouldAddProduct == "true") ? true: false; 
        console.log("products detail is", req.user.id, req.params.id, req.body.productId, shouldAddProduct)
        const response = await cartService.updateCart(req.user.id, req.params.id, req.body.productId, shouldAddProduct);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Updated Cart successfully",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}
async function getCartProducts(req, res) {

    try {
        const response = await cartService.getCartProducts(req.params.id, req.user.id);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Updated Cart successfully",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}
async function clearCart(req, res) {

    try {
        const response = await cartService.clearCart(req.params.id, req.user.id);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Clear Cart successfully",
                    data: `Whose product id is :-> ${response}`
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}



module.exports = {
    updateCart, getCartProducts,
    clearCart,
}