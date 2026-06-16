

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

         res.json({ resumeId: newResume._id })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}