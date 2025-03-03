const express = require("express")
const usercontroller = require("./controller/usercontroller")




const router = new express.Router()


//to register

router.post('/admin-reg',usercontroller.registerAdminController)
router.post('/reg-worker',usercontroller.registerWorkerController)
/* 
router.post('/admin-log', usercontroller.loginController) */

















module.exports=router