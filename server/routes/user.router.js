
const express = require("express")
const { handleUserRegister, handleUserLogin, handleProfileData, handleForgotPass,  } = require("../controller/user.controller")
const { auth } = require("../middleware/auth")

const nodemailer = require("nodemailer");
  const UserRouter = express.Router()

  UserRouter.post("/register", handleUserRegister)
  UserRouter.post("/login", handleUserLogin)
  UserRouter.get("/profile",auth, handleProfileData)
  UserRouter.post("/forgot-password", handleForgotPass)
  module.exports = {
    UserRouter
  }