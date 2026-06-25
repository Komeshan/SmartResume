import express from "express"
import { createResume, updateResume, deleteResume, getResumeById, getPublicResumeById } from "../controllers/resumeController.js"
import protect from "../middlewares/authMiddleware.js"
import upload from "../configs/multer.js"


const resumeRouter = express.Router()

resumeRouter.post("/create", protect, createResume)
resumeRouter.put("/update", (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            let errMsg = err.message;
            if (err.code === 'LIMIT_FILE_SIZE') {
                errMsg = 'File size limit exceeded. Maximum upload limit is 5MB.';
            }
            return res.status(400).json({ message: errMsg });
        }
        next();
    });
}, protect, updateResume)
resumeRouter.delete("/delete/:resumeId", protect, deleteResume)
resumeRouter.get("/get/:resumeId", protect, getResumeById)
resumeRouter.get("/public/:resumeId", getPublicResumeById)

export default resumeRouter