const express = require("express")
const { handleCreateUserAddress, handleGetUserAddress, handleUpdateUserAddress } = require("../controller/address.controller")
const { auth } = require("../middleware/auth")



const AddressRouter = express.Router()
AddressRouter.use(auth)

AddressRouter.post("/create", handleCreateUserAddress)
AddressRouter.get("/get", handleGetUserAddress)
AddressRouter.patch("/update/:addressId", handleUpdateUserAddress)

module.exports = {
    AddressRouter
}