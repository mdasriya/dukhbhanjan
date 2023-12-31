
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
 firstName:{type:"string", required:true},
 lastName:{type:"string", required:true},
 email:{type:"string", required:true},
 pass:{type:"string", required:true},
 resetPin: { type: String, default: null }, 
 resetPinExpiration: { type: Date, default: null },

},{
   versionKey:false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
UserModel
}