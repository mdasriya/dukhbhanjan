
const express = require("express")
const { handleUserRegister, handleUserLogin, handleProfileData, handleForgotPass, getAllUser,  } = require("../controller/user.controller")
const { auth } = require("../middleware/auth")

const nodemailer = require("nodemailer");
  const UserRouter = express.Router()

  UserRouter.post("/register", handleUserRegister)
  UserRouter.post("/login", handleUserLogin)
  UserRouter.get("/", getAllUser)

  UserRouter.get("/profile",auth, handleProfileData)
  UserRouter.post("/forgot-password", handleForgotPass)
  module.exports = {
    UserRouter
  }