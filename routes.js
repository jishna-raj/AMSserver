const express = require("express")
const usercontroller = require("./controller/usercontroller")

const childController = require('./controller/childController')





const jwt = require('./middlewares/jwtmiddleware')

const multer = require('./middlewares/multermiddleware')




const router = new express.Router()


//to register

router.post('/admin-reg',usercontroller.registerAdminController)
router.post('/reg-worker',usercontroller.registerWorkerController)

/* 
to login */

router.post('/admin-log',usercontroller.loginAdminController)
router.post('/login-worker',usercontroller.loginWorkerController)


/* add child */

router.post('/add-child',jwt,multer.single("childImage"),childController.addChildController)

/* get all child */

router.get('/all-child',childController.getAllChildController)

/* get a child */

router.get('/child/:id', childController.getChildByIdController);

/* update a child */

router.put('/update-child/:id',childController.updateChildController)

/* delete child */

router.delete('/delete-child/:id',childController.deleteChildController)

















module.exports=router