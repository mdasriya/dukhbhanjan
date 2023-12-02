
const express = require("express")
const { handleUserRegister, handleUserLogin, handleProfileData,  } = require("../controller/user.controller")
const { auth } = require("../middleware/auth")
const passwordValidation = require("../middleware/passwordValidation")
  
  const UserRouter = express.Router()

  UserRouter.post("/register", handleUserRegister)
  UserRouter.post("/login", handleUserLogin)
  UserRouter.get("/profile",auth, handleProfileData)

  module.exports = {
    UserRouter
  }