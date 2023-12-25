const { ContactModel } = require("../model/contact.model")







const handleContactCreate = async (req, res) => {

    const data = req.body
   
    try {
        const contact = new ContactModel(data)
        await contact.save()
        res.status(200).json({ msg: "new contact has been created" })
    } catch (error) {
        res.status(500).json({msg:"Something Went Wrong", error:error.message})
    }
}

const handleContactGet = async(req,res) => {
      try {
       const contact = await ContactModel.find() 
       res.status(200).send(contact)
      } catch (error) {
        res.status(500).json({msg:"Something Went Wrong", error:error.message})
      }
}





module.exports = {
    handleContactCreate,handleContactGet
}