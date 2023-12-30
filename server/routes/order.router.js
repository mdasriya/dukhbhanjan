const express = require("express")
const { handleCreateOrder, handleGetOrder, handleGetAllOrders } = require("../controller/order.controller")
const { auth } = require("../middleware/auth")



 const OrderRouter = express.Router()
 
// OrderRouter.use(auth)
 OrderRouter.post("/create",auth, handleCreateOrder)
 OrderRouter.get("/",auth, handleGetOrder)
 OrderRouter.get("/all", handleGetAllOrders)


module.exports = {
    OrderRouter
}