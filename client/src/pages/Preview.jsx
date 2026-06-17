import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {

  const {resumeId} = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResumeData = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`)
      if (data.resume) {
        setResumeData(data.resume)
      }
    } catch (error) {
      
      console.log(error.message)
      
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResumeData()
  },[])

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview classes='py-4 bg-white' data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader/> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
          <a href="/app" className='mt-6 bg-blue-500 hover:bg-blue-600 flex items-center text-white border px-6 h-9 m-1 ring-offset-1 ring-1 ring-blue-400 rounded-full transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4'/>
            go to dashboard page
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview