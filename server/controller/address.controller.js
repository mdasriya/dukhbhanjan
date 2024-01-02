const { addressModel } = require("../model/address.model")
const { UserModel } = require("../model/user.model")

const handleCreateUserAddress = async (req, res) => {
   const data = req.body
   const { UserId } = req.body

   try {
      const user = await UserModel.find({ _id: UserId })
      const match = await addressModel.find({ UserId })
      if (match.length > 0) {
         res.status(200).json({ msg: "user address present", state: "handlePayment" })
      } else if (data.address1.length > 0) {
         const address = new addressModel(data)
         await address.save()
         const newAddress = new UserModel([...user, ...data])
         await newAddress.save()
         res.status(200).json({ msg: "address added successfully", state: "created" })
      } else {
         res.status(200).json({ msg: "user address present", state: "onOpen" })
      }
   } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: "Something Went Wrong", error: error.message, state: false })
   }
   // try {
   //     const reqdata = await addressModel.find({ UserId }) 
   //     console.log(reqdata)
   //     if(reqdata.length>0){
   //         console.log("if caal")
   //     res.status(200).json({ msg: "Address Already Present", state:"already" })  
   //     }else{
   //          const address = new addressModel(data)
   //         await address.save()
   //          res.status(200).json({ msg: "address added successfully" , state:"create"})
   //     }
   // } catch (error) {
   //     res.status(500).json({msg:"Something Went Wrong", error:error.message, state:false})
   // }

}
const handleGetUserAddress = async (req, res) => {
   const { UserId } = req.body
   try {
      const address = await addressModel.find({ _id: UserId })
      res.status(200).send(address)
   } catch (error) {
      res.status(500).json({ msg: "Something Went Wrong", error: error.message })
   }

}

const handleGetAllAddress = async (req, res) => {
   try {
      const address = await addressModel.find()
      res.status(200).send(address)
   } catch (error) {
      res.status(500).json({ msg: "Something Went Wrong", error: error.message })
   }
}


const handleUpdateUserAddress = async (req, res) => {

   const addressIdinUserDoc = req.body.AddressId
   const { addressId } = req.params


   try {
      const address = await ClientModel.findOne({ _id: addressId })
      const userIDinAddressDoc = address.UserId

      if (addressIdinUserDoc === userIDinAddressDoc) {

         await addressModel.findByIdAndUpdate({ _id: addressId }, req.body)
         res.json({ msg: `Address update success!!` })
      } else {
         res.json({ msg: "you are not Authorized" })
      }
   } catch (error) {
      console.log(error);
   }



}

module.exports = {
   handleCreateUserAddress, handleGetUserAddress, handleUpdateUserAddress, handleGetAllAddress
}