import Resume from "../models/Resume.js"
import aiRouter from "../routes/aiRoutes.js"
import ai from "../configs/ai.js"


//controller for professional summary enhancement using AI
//POST: /api/ai/enhance-professional-summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body
 
        if (!userContent) {
            return res.status(400).json({ message: 'User content is required' })
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

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({ enhancedContent })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


//controller for job description enhancement using AI
//POST: /api/ai/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body

        if (!userContent) {
            return res.status(400).json({ message: 'User content is required' })
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

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({ enhancedContent })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


//controller for uploading a resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        
        const { resumeText, title } = req.body
        const userId = req.userId

        if (!resumeText) {
            return res.status(400).json({ message: 'Resume text is required' })
        }

        const systemPrompt = 'you are an expert AI Agent to extract data from resume'

        const userPrompt = `extract data from the resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:
        
        {
            "professional_summary": "string - extracted professional summary",
            "skills": ["string - skill 1", "string - skill 2"],
            "personal_info": {
                "image": "",
                "full_name": "string - extracted full name",
                "profession": "string - extracted profession",
                "email": "string - extracted email",
                "phone": "string - extracted phone",
                "location": "string - extracted location",
                "linkedin": "string - extracted linkedin url",
                "website": "string - extracted portfolio/website url"
            }, 
            "experience": [
                {
                    "company": "string - company name",
                    "position": "string - job position",
                    "start_date": "string - start date",
                    "end_date": "string - end date or 'Present'",
                    "description": "string - description of responsibilities",
                    "is_current": false
                }
            ],
            "project": [
                {
                    "name": "string - project name",
                    "type": "string - project type/technologies used",
                    "description": "string - project description"
                }
            ],
            "education": [
                {
                    "institution": "string - school or university name",
                    "degree": "string - degree/qualification",
                    "field": "string - field of study",
                    "graduation_date": "string - graduation date",
                    "gpa": "string - GPA or empty string"
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

         res.json({ resumeId: newResume._id })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}