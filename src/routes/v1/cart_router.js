const express = require("express");
const { updateCart } = require("../../controllers/cart_controller");
const { isLoggedIn } = require("../../middlewares/auth_middleware");


const cartRouter = express.Router()

cartRouter.patch("/:id",[isLoggedIn], updateCart)


module.exports = cartRouter;