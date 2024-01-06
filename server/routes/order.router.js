const express = require("express")
const { handleCreateOrder, handleGetOrder, handleGetAllOrders, handleCancelOrder } = require("../controller/order.controller")
const { auth } = require("../middleware/auth")



const OrderRouter = express.Router()

// OrderRouter.use(auth)
OrderRouter.post("/create", handleCreateOrder)
OrderRouter.get("/", auth, handleGetOrder)
OrderRouter.get("/all", handleGetAllOrders)
OrderRouter.patch("/cancel/:id", handleCancelOrder)

module.exports = {
    OrderRouter
}