import express from 'express'
import authenticate from '../middlewares/authenticate.js'
import { getAdminJob, getAllJobs, getJobById, postJob } from '../controllers/jobController.js'

const router=express.Router()

router.route('/post').post(authenticate,postJob)
router.route('/get').get(getAllJobs)
router.route('/get/:id').get(getJobById)
router.route('/getadminjobs').get(authenticate,getAdminJob)


export default router