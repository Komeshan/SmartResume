import React, { useEffect } from 'react'
import { dummyResumeData } from '../assets/assets'

const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const [ resumeData, setResumeData] = React.useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#9333ea',
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume._id === resumeId)
    if(resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(() => {
    loadExistingResume()
  },[])


  return (
    <div>
      
    </div>
  )
}

export default ResumeBuilder