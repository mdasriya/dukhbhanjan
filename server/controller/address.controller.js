const { addressModel } = require("../model/address.model")

 const handleCreateUserAddress = async(req,res) =>{
    const data = req.body
    const {UserId} = req.body
 
    try {
        const reqdata = await addressModel.find({ UserId }) 
        if(reqdata.length>0){
        res.status(200).json({ msg: "Address Already Present", state:false })  
        }else{
            const address = new addressModel(data)
            await address.save()
            res.status(200).json({ msg: "address added successfully" , state:true})
        }
       
       
    } catch (error) {
        res.status(500).json({msg:"Something Went Wrong", error:error.message, state:false})
    }
    
 }
 const handleGetUserAddress = async(req,res) =>{
    try {
        const address = await addressModel.find({_id:UserId}) 
        res.status(200).send(address)
       } catch (error) {
         res.status(500).json({msg:"Something Went Wrong", error:error.message})
       }

 }
 const handleUpdateUserAddress = async(req,res) =>{
   
        const addressIdinUserDoc = req.body.AddressId
        const { addressId } = req.params
    
    
        try {
            const address = await ClientModel.findOne({ _id: addressId })
            const userIDinAddressDoc = address.UserId
    
            if (addressIdinUserDoc === userIDinAddressDoc) {
              
               await addressModel.findByIdAndUpdate({_id:addressId}, req.body)
               res.json({msg:`Address has been updated`})
            } else {
                res.json({ msg: "you are not Authorized" })
            }
        } catch (error) {
            console.log(error);
         }
    

    
 }

 module.exports = {
    handleCreateUserAddress,handleGetUserAddress,handleUpdateUserAddress
 }