import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { checkQuota } from "../middlewares/quotaMiddleware.js"
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/generationController.js"

const generationRouter = express.Router()

generationRouter.post('/enhance-pro-sum', protect, checkQuota('summary'), enhanceProfessionalSummary)
generationRouter.post('/enhance-job-desc', protect, checkQuota('summary'), enhanceJobDescription)
generationRouter.post('/upload-resume', protect, checkQuota('parser'), uploadResume)

export default generationRouter
