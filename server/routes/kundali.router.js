const express = require("express")

const { auth } = require("../middleware/auth")
const { handlekundaliCreate, handlekundaliGet } = require("../controller/kundali.controller")


 const KundaliRouter = express.Router()
 KundaliRouter.use(auth)

 KundaliRouter.post("/create", handlekundaliCreate)
 KundaliRouter.get("/", handlekundaliGet)

module.exports = {
    KundaliRouter
}
  

