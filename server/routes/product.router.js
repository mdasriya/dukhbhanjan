const express = require("express")
const { handleCreateProduct, handleGetProduct } = require("../controller/product.controller")



 const ProductRouter = express.Router()
 

 ProductRouter.post("/create", handleCreateProduct)
 ProductRouter.get("/", handleGetProduct)
//  ProductRouter.get("/update/:productId", handleUpadteProduct)
//  ProductRouter.get("/delete/:productId", handleDeleteProduct)

module.exports = {
    ProductRouter
}