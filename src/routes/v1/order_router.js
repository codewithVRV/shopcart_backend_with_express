const express = require("express");
const { isLoggedIn } = require("../../middlewares/auth_middleware");
const { createOrder, fetchOrderDetails } = require("../../controllers/order_controller");

const orderRouter = express.Router()

orderRouter.post("/", [isLoggedIn], createOrder)
orderRouter.get("/:id", [isLoggedIn], fetchOrderDetails)
module.exports = orderRouter;