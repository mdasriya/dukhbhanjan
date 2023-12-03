const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({
    title:{type:"string", required:true},
    price:{type:"Number", required:true},
    image:{type:"string", required:true},
    quantity:{type:"Number", required:true},
    quality:{type:"String", required:true},
 UserId:{type:"String", required:true},
 compareId:{type:"String", required:true},
    user:{type:"String", required:true}
   },{
      versionKey:false
   })

   const CartModel = mongoose.model("cart", cartSchema)

   module.exports = {
    CartModel
   }