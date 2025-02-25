const users = require('../model/userModel')
const jwt = require("jsonwebtoken")


exports.registerController = async (req, res)=> {


    const { username, email, password } = req.body
    console.log(username, email, password);


    try {

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json('already exist')
        }

        else {
            const newUser = new users({
                username,
                email,
                password,
                role: 'inputRole', // 'admin', 'worker', or 'healthOfficial'
                firstName:'',
                lastName:'',
                phoneNumber: '',
                address: '',
               
                profileImg: '',
            });
            
            
            await newUser.save()
            res.status(200).json(newUser)

        }

    } catch (err) {
        res.status(401).json(err)
    }



} 




exports.loginController = async(req,res)=>{

    const {email,password} = req.body

    console.log(email,password);
 

    try {
        const existingUser = await users.findOne({email,password})


        if(existingUser){

            const token = jwt.sign({userId:existingUser._id},'superkey')

            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('account doesnot exist')
        }
            
        }
        catch (error) {
        res.status(401).json(error)
    }
}


