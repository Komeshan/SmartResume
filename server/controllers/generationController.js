import Resume from "../models/Resume.js"
import User from "../models/User.js"
import AiCache from "../models/AiCache.js"
import ai from "../configs/ai.js"
import { incrementQuota } from "../middlewares/quotaMiddleware.js"

// Controller for professional summary enhancement using AI
// POST: /api/generation/enhance-professional-summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent, rawText: clientRawText } = req.body
 
        if (!userContent) {
            return res.status(400).json({ message: 'User content is required' })
        }

        // 1. Check AI Cache
        let rawText = clientRawText;
        if (!rawText) {
            const prefix = "enhance my professional summary '";
            const suffix = "'";
            if (userContent.startsWith(prefix) && userContent.endsWith(suffix)) {
                rawText = userContent.substring(prefix.length, userContent.length - suffix.length);
            } else {
                const summaryMatch = userContent.match(/enhance my professional summary '(.*)'/s);
                rawText = summaryMatch ? summaryMatch[1] : userContent;
            }
        }

        const trimmedRawText = rawText.trim();
        const trimmedUserContent = userContent.trim();

        const cached = await AiCache.findOne({ 
            userId: req.userId, 
            $or: [
                { inputText: trimmedUserContent },
                { outputText: trimmedRawText }
            ],
            type: 'summary' 
        })
        if (cached) {
            const user = await User.findById(req.userId)
            const responseText = cached.outputText === trimmedRawText ? trimmedRawText : cached.outputText;
            return res.status(200).json({ enhancedContent: responseText, limits: user?.aiUsage })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: 'system', 
                    content: 'you are an expert resume writer. Your task is to enhance the professional summary section of a resume. You will be given the users current professional summary and you need to improve it by making it 2-3 sentences, impactful, and tailored to the job market. Focus on highlighting key skills, achievements, and experiences that make the candidate stand out. Make it compelling and ATS friendly. Avoid adding any new information that is not provided by the user and return only text and no other output.'},
                {
                    role: 'user',
                    content: userContent,
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content.trim()
        
        // 2. Save result to cache
        await AiCache.create({
            userId: req.userId,
            inputText: trimmedUserContent,
            outputText: enhancedContent,
            type: 'summary'
        })

        // Success: Increment the summary count for the user
        const updatedLimits = await incrementQuota(req.userId, 'summary')

        return res.status(200).json({ enhancedContent, limits: updatedLimits })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// Controller for job description enhancement using AI
// POST: /api/generation/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent, rawText: clientRawText } = req.body

        if (!userContent) {
            return res.status(400).json({ message: 'User content is required' })
        }

        // 1. Check AI Cache
        let rawText = clientRawText;
        if (!rawText) {
            const match = userContent.match(/enhance this job description (.*) for the position of .* at .*/s);
            rawText = match ? match[1] : userContent;
        }

        const trimmedRawText = rawText.trim();
        const trimmedUserContent = userContent.trim();

        const cached = await AiCache.findOne({ 
            userId: req.userId, 
            $or: [
                { inputText: trimmedUserContent },
                { outputText: trimmedRawText }
            ],
            type: 'experience' 
        })
        if (cached) {
            const user = await User.findById(req.userId)
            const responseText = cached.outputText === trimmedRawText ? trimmedRawText : cached.outputText;
            return res.status(200).json({ enhancedContent: responseText, limits: user?.aiUsage })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: 'system', 
                    content: 'you are an expert resume writer. Your task is to enhance the job description section of a resume. You will be given the users current job description and you need to improve it by making it 1-2 sentences. Focus on highlighting key responsibilities, achievements, and experiences.Use active voice and strong action verbs and quantify results where possible. Make it compelling and ATS friendly. Avoid adding any new information that is not provided by the user and return only text and no other output.'},
                {
                    role: 'user',
                    content: userContent,
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content.trim()

        // 2. Save result to cache
        await AiCache.create({
            userId: req.userId,
            inputText: trimmedUserContent,
            outputText: enhancedContent,
            type: 'experience'
        })

        // Success: Increment the summary count for the user (since it is a daily action)
        const updatedLimits = await incrementQuota(req.userId, 'summary')

        return res.status(200).json({ enhancedContent, limits: updatedLimits })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// Controller for uploading/parsing a resume to the database using AI
// POST: /api/generation/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body
        const userId = req.userId

        if (!resumeText) {
            return res.status(400).json({ message: 'Resume text is required' })
        }

        const systemPrompt = `You are an expert AI Agent specializing in extracting structured data from resume text.
Your task is to accurately extract professional summary, skills, personal info, experience, projects, and education.

CRITICAL INSTRUCTION:
- Check the resume text for a block starting with 'RAW_METADATA_START' and ending with 'RAW_METADATA_END'.
- If you find this metadata block, you MUST extract the values for:
  * 'IMAGE_URL: <url>' -> populate 'personal_info.image'. If value is 'none', use an empty string.
  * 'LINKEDIN_URL: <url>' -> populate 'personal_info.linkedin'. If value is 'none', use an empty string.
  * 'WEBSITE_URL: <url>' -> populate 'personal_info.website'. If value is 'none', use an empty string.
  * 'PROJECT_START PROJECT_NAME: <name> PROJECT_TYPE: <type> PROJECT_DESC: <desc> PROJECT_END' blocks -> populate the 'project' array. For each block, create a project object. If value is 'none', use an empty string.
- These metadata values are the absolute ground truth. Prioritize them for these fields over any other extracted text to ensure 100% accuracy.
- If the metadata block is not present or does not contain these keys, extract them standardly from the resume body text.
- Ensure the 'project' array is populated exactly with the distinct projects listed in the metadata block (do not split a single project into multiple items, and do not combine different projects).
- For all other fields (full_name, email, phone, location, profession, experience, education, skills, professional_summary), extract them standardly from the text of the resume.`

        const userPrompt = `extract data from the resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:
        
        {
            professional_summary: {type: String, default: ''},
            skills: [{type: String}],
            personal_info: {
                image: {type: String, default: ''},
                full_name: {type: String, default: ''},
                profession: {type: String, default: ''},
                email: {type: String, default: ''},
                phone: {type: String, default: ''},
                location: {type: String, default: ''},
                linkedin: {type: String, default: ''},
                website: {type: String, default: ''},
            }, 
            experience: [
                {
                    company: {type: String},
                    position: {type: String},
                    start_date: {type: String},
                    end_date: {type: String},
                    description: {type: String},
                    is_current: {type: Boolean},
                }
            ],
            project: [
                {
                    name: {type: String},
                    type: {type: String},
                    description: {type: String},
                }
            ],
            education: [
                {
                    institution: {type: String},
                    degree: {type: String},
                    field: {type: String},
                    graduation_date: {type: String},
                    gpa: {type: String},
                }
            ]
        }`

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: 'system', 
                    content: systemPrompt},
                {
                    role: 'user',
                    content: userPrompt,
                }
            ], 
            response_format: {type: 'json_object'}
        })

        const extractedData = response.choices[0].message.content
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId, title, ...parsedData})

        // Success: Increment the weekly parser count for the user
        const updatedLimits = await incrementQuota(userId, 'parser')

        res.json({ resumeId: newResume._id, limits: updatedLimits })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
