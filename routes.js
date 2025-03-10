const express = require("express")
const usercontroller = require("./controller/usercontroller")

const childController = require('./controller/childController')

const inventoryController = require('./controller/inventoryController')

const workerController = require('./controller/workerController')

const childBeneficiaryController = require('./controller/ChildBeneficiaryController')

const motherController = require('./controller/motherController')





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


router.get('all-mother',motherController)













module.exports=router