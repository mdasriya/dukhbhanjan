const express = require("express")
const { handleCreateOrder, handleGetOrder } = require("../controller/order.controller")
const { auth } = require("../middleware/auth")



 const OrderRouter = express.Router()
 
OrderRouter.use(auth)
 OrderRouter.post("/create", handleCreateOrder)
 OrderRouter.get("/", handleGetOrder)


module.exports = {
    OrderRouter
}