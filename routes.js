const express = require("express")
const usercontroller = require("./controller/usercontroller")




const router = new express.Router()


//to register

router.post('/admin-reg',usercontroller.registerController)
router.post('/admin-log', usercontroller.loginController)

















module.exports=router