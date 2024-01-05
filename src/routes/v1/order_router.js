const express = require("express");
const { isLoggedIn } = require("../../middlewares/auth_middleware");
const { createOrder } = require("../../controllers/order_controller");

const orderRouter = express.Router()

orderRouter.post("/", [isLoggedIn], createOrder)
module.exports = orderRouter;