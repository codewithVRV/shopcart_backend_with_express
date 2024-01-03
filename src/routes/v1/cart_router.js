const express = require("express");
const { updateCart, getCartProducts, clearCart } = require("../../controllers/cart_controller");
const { isLoggedIn } = require("../../middlewares/auth_middleware");


const cartRouter = express.Router()

cartRouter.patch("/:id",[isLoggedIn], updateCart)
cartRouter.get("/:id/products",[isLoggedIn], getCartProducts)
cartRouter.delete("/:id/products",[isLoggedIn], clearCart)


module.exports = cartRouter;