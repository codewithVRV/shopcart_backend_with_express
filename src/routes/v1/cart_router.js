const express = require("express");
const { updateCart, getCartProducts } = require("../../controllers/cart_controller");
const { isLoggedIn } = require("../../middlewares/auth_middleware");


const cartRouter = express.Router()

cartRouter.patch("/:id",[isLoggedIn], updateCart)
cartRouter.get("/:id/products",[isLoggedIn], getCartProducts)


module.exports = cartRouter;