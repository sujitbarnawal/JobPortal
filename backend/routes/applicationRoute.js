import express from "express"
import { applyJob, getAllApplicants, getAllAppliedJobs, updateStatus } from "../controllers/applicationController.js"
import authenticate from "../middlewares/authenticate.js"

const router=express.Router()

router.route('/apply/:id').post(authenticate,applyJob)
router.route('/:id/applicants').get(authenticate,getAllApplicants)
router.route('/get-applied-jobs').get(authenticate,getAllAppliedJobs)
router.route('/status/:id/update').post(authenticate,updateStatus)

export default router;