const express = require("express")

const userRouter = express.Router()
const {createUser, getUserByEmail} = require("../../controllers/user_controller")


userRouter.post("/signup", createUser)
userRouter.post("/signin", getUserByEmail)

module.exports = userRouter;