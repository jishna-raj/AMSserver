const express = require("express")
const usercontroller = require("./controller/usercontroller")

const childController = require('./controller/childController')

const inventoryController = require('./controller/inventoryController')

const workerController = require('./controller/workerController')

const childBeneficiaryController = require('./controller/ChildBeneficiaryController')

const motherController = require('./controller/motherController')

const pregnantController = require('./controller/pregnantController')

const parentController = require('./controller/parentcontroller')

const healthofficialController = require('./controller/healthOfficialController') 

const complaintController = require('./controller/ComplaintController')




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


router.get('/all-user',usercontroller.getalluserController)


router.put('/update-user/:id',usercontroller.updateusercontroller)

router.delete('/delete-user/:id',usercontroller.deleteUserController)


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



/* Inventory */

/* 1.add inventory */

router.post('/add-inventory',inventoryController.addInventoryController)

/* get all inventory */


router.get('/all-inventory',inventoryController.getAllInventoryController)



router.put('/update-inventory/:id',inventoryController.updateInventoryController)


router.delete('/delete-inventory/:id',inventoryController.deleteInventoryController)



/* workers...... */

router.post('/add-worker',workerController.addworkerController)


router.get('/all-worker',workerController.allWorkerController)


router.get('/get-worker/:id', workerController.getAWorkerApi);

router.put('/update-worker/:id',workerController.updateWorkerController)


router.delete('/delete-worker/:id',workerController.workerDeleteController)



/* child beneficiary */

router.post('/add-childbeneficiary',childBeneficiaryController.addChildBeneficiaryController)



router.get('/all-childbeneficiaries',childBeneficiaryController.getallchildbeneficiaryController)

router.get('/a-childbeneficiary/:id',childBeneficiaryController.getAchildBeneficiaryController)


router.put('/update-childbeneficiary/:id',childBeneficiaryController.updateChildbeneficiariesController)



router.delete('/delete-childbeneficiaries/:id',childBeneficiaryController.deleteChildBeneficiaries)




/* lactinating */


router.post('/add-lact',motherController.addMotherController)


router.get('/all-mother',motherController.getAllMotherController)


router.get('/a-mother/:id',motherController.getAMotherController)


router.put('/update-lact/:id',motherController.updatemothercontroller)


router.delete('/delete-lact/:id',motherController.deleteMotherController)




/* pregnant */

router.post('/add-pregnant',multer.single('document'),pregnantController.addPregnantController)


router.get('/get-allpregnant',pregnantController.getallpregnantController)


router.get('/getapregnant/:id',pregnantController.getApregnantController)


router.put('/update-pregnant/:id',pregnantController.updatepregnantController)


router.delete('/delete-pregnant/:id',pregnantController.deletepregnantController)



router.post('/parent-register',parentController.ParentRegController)


router.post('/parent-login',parentController.ParentLoginController)


router.post('/health-login',healthofficialController.loginController)


router.post('/add-complaint',complaintController.addComplaintsController)


router.get('/get-complaint',complaintController.getallComplaintsController)


router.get('/get-a-complaint',complaintController.getaComplaintController)



router.put('/update-complaint/:id',complaintController.updateComplaintController)














module.exports=router