import imagekit from "../configs/imageKit.js"
import Resume from "../models/Resume.js"
import fs from "fs"
import User from "../models/User.js"
import { incrementQuota } from "../middlewares/quotaMiddleware.js"

// Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId
        const {title} =req.body

        //create new resume
        const newResume = await Resume.create({userId, title})

        //return success response 
        return res.status(201).json({ message: "Resume created successfully", resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId
        const {resumeId} = req.params

        await Resume.findOneAndDelete({userId, _id: resumeId})

        // return success response
        return res.status(200).json({ message: "Resume deleted successfully"})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// get user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId
        const {resumeId} = req.params

        const resume = await Resume.findOne({userId, _id: resumeId})

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        resume.__v = undefined // hide __v in response
        resume.createdAt = undefined // hide createdAt in response
        resume.updatedAt = undefined // hide updatedAt in response
        return res.status(200).json({resume})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// get resume id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const {resumeId} = req.params
        const resume = await Resume.findOne({public: true, _id: resumeId})

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({resume})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// controller for updating resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId
        const {resumeId, resumeData, removeBackground} = req.body
        const image = req.file

        let resumeDataCopy
        if(typeof resumeData === 'string') {
            resumeDataCopy = JSON.parse(resumeData)
        } else {
            resumeDataCopy = structuredClone(resumeData)
        }

        if (image) {
            // --- Quota Limit Check for Profile Images ---
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            if (!user.aiUsage) {
                user.aiUsage = {
                    summaryCount: 0,
                    summaryLastReset: new Date(),
                    parserCount: 0,
                    parserLastReset: new Date(),
                    imageCount: 0,
                    imageLastReset: new Date()
                }
                await user.save()
            }

            const now = new Date()
            const limit = 2
            const duration = 30 * 24 * 60 * 60 * 1000 // 30 days
            const lastReset = new Date(user.aiUsage.imageLastReset)
            let currentCount = user.aiUsage.imageCount

            // Check if reset duration has passed
            const timeElapsed = now.getTime() - lastReset.getTime()
            if (timeElapsed >= duration) {
                user.aiUsage.imageCount = 0
                user.aiUsage.imageLastReset = now
                await user.save()
                currentCount = 0
            }

            if (currentCount >= limit) {
                const hoursLeft = Math.max(0, Math.ceil((duration - (now.getTime() - lastReset.getTime())) / (1000 * 60 * 60)))
                const daysLeft = Math.max(1, Math.ceil(hoursLeft / 24))
                return res.status(429).json({ 
                    message: `Image upload limit reached! You have used all ${limit} monthly profile uploads. Try again in about ${daysLeft} days.`,
                    limits: user.aiUsage
                })
            }
            // ---------------------------------------------

            const imageBufferData = fs.createReadStream(image.path)

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes'
            });
 
            // Append ImageKit transformations to the URL for centering (face crop) and background removal
            let imageUrl = response.url;
            imageUrl += '?tr=w-300,h-300,fo-face,z-0.75';
            if (removeBackground === 'yes' || removeBackground === 'true' || removeBackground === true) {
                imageUrl += ',e-bgremove';
            }
            resumeDataCopy.personal_info.image = imageUrl;

            // Success: Increment ImageKit upload counter
            await incrementQuota(userId, 'image')
        } else if (resumeDataCopy.personal_info && typeof resumeDataCopy.personal_info.image === 'string' && resumeDataCopy.personal_info.image && resumeDataCopy.personal_info.image !== 'undefined' && resumeDataCopy.personal_info.image !== 'null') {
            let imgUrl = resumeDataCopy.personal_info.image;
            const hasBgRemove = imgUrl.includes(',e-bgremove');
            const shouldBgRemove = removeBackground === 'yes' || removeBackground === 'true' || removeBackground === true;
            
            if (shouldBgRemove && !hasBgRemove) {
                resumeDataCopy.personal_info.image = imgUrl + ',e-bgremove';
            } else if (!shouldBgRemove && hasBgRemove) {
                resumeDataCopy.personal_info.image = imgUrl.replace(',e-bgremove', '');
            }
        }

        const resume = await Resume.findOneAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true})
        
        // Fetch updated limits to return
        const updatedUser = await User.findById(userId)
        
        return res.status(200).json({ message: "Resume saved successfully", resume, limits: updatedUser?.aiUsage })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

