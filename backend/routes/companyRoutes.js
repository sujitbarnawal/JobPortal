import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js"
import authenticate from "../middlewares/authenticate.js"
import { singleUpload } from "../middlewares/multer.js"
const router=express.Router()

router.route('/register').post(authenticate,registerCompany)
router.route('/get').get(authenticate,getCompany)
router.route('/get/:id').get(authenticate,getCompanyById)
router.route('/update/:id').put(authenticate,singleUpload,updateCompany)

export default router