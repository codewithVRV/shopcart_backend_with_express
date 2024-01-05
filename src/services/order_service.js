const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const UnauthorizedError = require("../errors/unauthorized_error");

class OrderService {

    constructor(respository, cartRepository) {
        this.respository = respository;
        this.cartRepository = cartRepository;
    }

    
    async createOrder(userId) {
        try{
            // 1. check if there is a cart for the user or not:
            const cart = await this.cartRepository.getCartByUser(userId)
            console.log("cart is :->", cart)
            console.log("cartid is :->", cart.id)
            if(!cart) {
                throw new NotFoundError("Cart", "userId", userId)
            }
            const cartProducts = await cart.getProducts()
            console.log("cartProduct is", cartProducts)
            console.log("cartProduct length", cartProducts.length)
            if(cartProducts.length == 0) {
                throw new InternalServerError()
            }
            // 2. Create a new empty order;
            const order = await this.respository.createOrder(userId, "pending")
            console.log("order is", order)
            // 3. Add all products for the above cart

            const orderProductsBulkCreatedArray = cartProducts.map((product) => {
                return {
                    orderId: order.id,
                    productId : product.id,
                    quantity: product.cart_products.quantity,
                }
            })
            console.log("order Proudct bulk array is", orderProductsBulkCreatedArray)

            const orderProducts = await this.respository.addOrderProductsInBulk(orderProductsBulkCreatedArray)
            console.log("orderProducts is", orderProducts)

            // once order products are created, we should mark the order status successfull after payment

            console.log("order status is", order.status)
            order.status = "successfull"
            console.log("order status is", order.status)
            await order.save();
            console.log("cart id is :->", cart.id)
            await this.cartRepository.clearCart(cart.id)
            console.log("empty cart is:-", await this.cartRepository.getCart(cart.id))

            return {
                orderId: order.id,
                products: orderProducts,
            }

        }
        catch(error) {
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Order Service:-", error)
            throw new InternalServerError()
        }
        
    }


    async fetchOrderDetails (userId, orderId) {
        try{
            const orderObject = await this.respository.getOrder(orderId);
            console.log("orderObject is", orderObject)
            if(!orderObject){
                throw new NotFoundError("Order", "orderId", orderId)
            }
            if(orderObject.userId != userId) {
                throw new UnauthorizedError("You are not auhorized to do current operation.")
            }
            const response = await this.respository.fetchOrderDetails(orderId)
            const order = {id: response.id, status: response.status, createdAt: response.createdAt, updatedAt: response.updatedAt}
            let totalOrderValue = 0;
            order.products = response.products.map((product) => {
                totalOrderValue += product.price * product.order_products.quantity
                return {
                    id:  product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: product.order_products.quantity,
                }

            })
            order.totalPrice = totalOrderValue;
            return order;
        }
        catch(error) {
            if(error.name === "NotFoundError" || error.name === "UnauthorizedError"){
                throw error;
            }
            console.log("Order Service:-", error)
            throw new InternalServerError()
        }
    }
    
}


module.exports = OrderService;
