const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title:{type:"string", required:true},
    description:{type:"string", required:true},
    price:{type:"Number", required:true},
    image:{type:"string", required:true},
    quantity:{type:"Number", required:true},
    benefits:{type:"Array", required:true}
   },{
      versionKey:false
   })

   const ProductModel = mongoose.model("product", productSchema)

   module.exports = {
    ProductModel
   }