const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const OrderService = require('../services/order_service');
const {OrderRepository, CartRepository} = require('../repositories/index');
const errorResponse = require('../utils/error_response');

const orderService = new OrderService(new OrderRepository(), new CartRepository());

async function createOrder(req, res) {

    try {
        
        console.log(req.user.id, "this is user id")
        const response = await orderService.createOrder(req.user.id);
        console.log("response of create order controller is", res)
    
        return res
                .status(StatusCodes.CREATED)
                .json({
                    sucess: true,
                    error: {},
                    message: ReasonPhrases.CREATED + " Order",
                    data: response
        });

    } catch(error) {
        console.log("Order Controller Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}
async function fetchOrderDetails(req, res) {

    try {
        
        const response = await orderService.fetchOrderDetails(req.user.id, req.params.id);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "fetch order successfully",
                    data: response
        });

    } catch(error) {
        console.log("Order Controller Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}



module.exports = {
    createOrder, fetchOrderDetails
}