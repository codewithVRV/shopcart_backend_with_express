const {Order, OrderProduct, Product} = require('../models/index');

class OrderRepository {
    async getOrders() {
        try {
            const response = await Order.findAll();
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getOrder(id) {
        try {
            const response = await Order.findByPk(id);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(userId, status) {
        try {
            const response = await Order.create({
                userId, status
            });
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async addOrderProductsInBulk(orderProducts) {
        try {
            const response = await OrderProduct.bulkCreate(orderProducts);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
    
    async fetchOrderDetails(orderId) {
        try{
            const response = await Order.findOne({
                where : {
                    id: orderId
                },
                include: {
                    model: Product,
                    through: {
                        module: OrderProduct,
                        attributes: ["quantity"],
                    },
                    attributes: ["id", "title", "price", "image"]
                },
                attributes: ["id", "status", "createdAt", "updatedAt"],
                
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    
}


module.exports = OrderRepository;