
const brypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require('uuid');

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

const getAllUser = async(req,res) => {
    // const {UserId} = req.body 
    try {
        const userData = await UserModel.find() 
        if(userData){
            res.status(200).json({msg:"All user get success", users:userData, state:true})
        }else{
            res.status(400).json({msg:"User Not Found"}) 
        }
    } catch (error) {
        console.log(error);
}


}

const handleProfileData = async(req,res,) => {
const {UserId} = req.body 

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


const handleForgotPass =  async(req,res) => {
    const { email } = req.body;
try {
    const user = await UserModel.findOne({email})
    if (user) {
        // console.log(email)
        const verificationCode = uuidv4();
       // Store the verification code in memory

       const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
            user: 'edward.cruickshank@ethereal.email',
            pass: '6AYYJQAJgepx7zSQh9'
        },
        tls: {
          rejectUnauthorized: false,
        },
      });



 // Send the verification code via email
 const mailOptions = {
    from: 'mukeshdasriya87@gmail.com',
    to: email,
    subject: 'Password Reset Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error sending email' });
    }

    res.status(200).json({ message: 'Verification code sent to your email' });
  });


    }else{
          return res.status(404).json({ error: 'User not found' });
      }

} catch (error) {
   console.log(error) 
}
    // Check if the email exists
 
    
}

    //  // Update user record with verification code and expiration time
    //  await UserModel.findOneAndUpdate({ email }, { verificationCode, verificationCodeExpires });
    //  console.log("this try call")
    //  const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'mukeshd4797@gmail.com',
    //         pass: 'pgwo tikf ugwb rgvt'
    //     },
    //   }); 

    //   const mailOptions = {
    //     from: {
    //         name : "Mukesh Dasriya",
    //         address:"mukeshd4797@gmail.com"
    //     },
    //     to: email,
    //     subject: 'Password Reset Verification Code',
    //     text: `Your verification code is from mukesh: ${verificationCode}`,
    //     html:"Welcome to our Dukhbhanjan App"
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return res.status(500).send('Error sending email');
    //     }
    //     res.status(200).send('Verification code sent to your email');
    //   });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send('Internal Server Error');
    // }





module.exports = {
    handleUserRegister, handleUserLogin,handleProfileData,handleForgotPass,getAllUser
}