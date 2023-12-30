const express = require("express")
const { handleCreateUserAddress, handleGetUserAddress, handleUpdateUserAddress, handleGetAllAddress } = require("../controller/address.controller")
const { auth } = require("../middleware/auth")



const AddressRouter = express.Router()
// AddressRouter.use(auth)

AddressRouter.post("/create",auth, handleCreateUserAddress)
AddressRouter.get("/get", handleGetUserAddress)
AddressRouter.get("/", handleGetAllAddress)
AddressRouter.patch("/update/:addressId",auth, handleUpdateUserAddress)

module.exports = {
    AddressRouter
}