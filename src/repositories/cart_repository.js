const NotFoundError = require('../errors/not_found_error');
const {Cart, CartProduct} = require('../models/index');
const {Op} = require("sequelize")

class CartRepository {
    async getCarts() {
        try {
            const response = await Cart.findAll();
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getCart(id) {
        try {
            const response = await Cart.findByPk(id);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async createCart(userId) {
        try {
            const response = await Cart.create({
                userId
            });
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async destroyCart(cartId) {
        try {
            const response = await Cart.destroy({
                where: {
                    id: cartId
                }
            });
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async updateCart(cartId, productId, shouldAddProduct = true) {
        try{
            const result = await CartProduct.findOne({
                where:{
                    [Op.and] : [
                        {cartId: cartId},
                        {productId: productId}
                    ]
                }
            })
            if(shouldAddProduct) {
                // we want to add a product to cart
                if(!result) { 
                    // the product was not added in the cart
                    await CartProduct.create({
                        cartId, productId,
                    })
                }
                else{
                    // the product was already in the cart and we want to increment the quantity
                    result.increment({quantity:1})
                }
            }
            else{
                // we want to remove the product from the cart
                if(!result) {
                    // cart is not present
                    throw new NotFoundError("Cart Product", "product", productId)
                }
                if(result.quantity === 1) {
                    await CartProduct.destroy({
                        where : {
                            [Op.and] : [
                                {cartId: cartId},
                                {productId: productId}
                            ]
                        }
                    })
                }
                else{
                    result.increment({quantity: -1})
                }
            }
            const response = await CartProduct.findAll({
                where:{
                    cartId: cartId
                }
            })
            return {
                cartId: cartId,
                products: response
            }
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
    
}


module.exports = CartRepository;