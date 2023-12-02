
const brypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")

const handleUserRegister = async (req, res) => {
    const { firstName, lastName, email,pass } = req.body
    try {
        const reqdata = await UserModel.find({ email })
        if (reqdata.length > 0) {
            res.status(200).json({ msg: "you are Alerady Register" })
        } else {
            brypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ msg: err.message })
                } else {
                    const userData = new UserModel({ firstName,lastName, email, pass: hash })
                    await userData.save()
                    res.status(200).json({ msg: "User Register success!!!" })
                }
            })
        }
    } catch (error) {
        res.status(500).json({msg:"Something Went Wrong", error:error.message})
    }
}

const handleUserLogin = async (req, res) => {
    const { email, pass } = req.body

    try {
        const findData = await UserModel.findOne({ email })
        if (findData) {
            brypt.compare(pass, findData.pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ UserId: findData._id, user: findData.firstName }, "masai")
                    res.status(200).json({ msg: "User Login Success!!!", token: token, username: findData.firstName})
                } else {
                    res.status(200).json({ msg: "wrong Credential" })
                }
            })
        } else {
            res.status(200).json({ msg: "register first" })
        }

    } catch (error) {
        
       res.status(500).json({msg:"Something Went Wrong", error:error.message})
    }
}

const handleProfileData = async(req,res,) => {
const {UserId} = req.body 
// console.log(UserId)
try {
    const userData = await UserModel.findOne({_id:UserId}) 
    if(userData){
        res.status(200).send(userData)
    }else{
        res.status(400).json({msg:"User Not Found"}) 
    }
   } catch (error) {
    console.log(error); 
   }


}




module.exports = {
    handleUserRegister, handleUserLogin,handleProfileData
}