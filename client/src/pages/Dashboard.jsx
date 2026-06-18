import { FilePenLineIcon, FolderMinus, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, XIcon, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateLimits } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import api from '../configs/api'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = React.useState([])
  const [showCreateResume, setShowCreateResume] = React.useState(false)
  const [showUploadResume, setShowUploadResume] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [resume, setResume] = React.useState(null)
  const [editResumeId, setEditResumeId] = React.useState('')

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const {data} = await api.get('/api/users/resumes', {headers: {Authorization: `Bearer ${token}`}})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const {data} = await api.post('/api/resumes/create', {title}, {headers: {Authorization: `Bearer ${token}`}})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    if (!resume) {
      toast.error('Please select a PDF file to upload')
      return
    }
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const {data} = await api.post('/api/generation/upload-resume', {title, resumeText}, {headers: {Authorization: `Bearer ${token}`}})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      if (data.limits) {
        dispatch(updateLimits(data.limits))
        toast.success(`Resume uploaded and parsed successfully! (${2 - data.limits.parserCount}/2 remaining this week)`)
      }
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (e) => {
    try {
      e.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: {title}}, {headers: {Authorization: `Bearer ${token}`}}) 
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title} : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
  }  

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if(confirm) {
        const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: `Bearer ${token}`}}) 
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
    

  useEffect(() => {
    loadAllResumes()
    document.title = 'Dashboard | SMART Resume'
  },[])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header banner */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-5 border-b border-slate-200'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Workspace Panel</h1>
            <p className='text-sm text-slate-500 mt-1'>Organize and optimize your resume collections.</p>
          </div>
          <div className='mt-4 md:mt-0 flex items-center gap-3'>
            <span className='h-2 w-2 rounded-full bg-green-500 animate-pulse'></span>
            <p className='text-sm font-medium text-slate-600 bg-slate-100/80 border border-slate-200 px-4 py-2 rounded-xl'>
              User Profile: <span className='font-semibold text-slate-800'>{user?.name}</span>
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Left Column: lg:col-span-8 - Actions & Documents */}
          <div className='lg:col-span-8 space-y-8'>
            
            {/* Header controls (Sleek action cards) */}
            <div>
              <h3 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-4'>Create New Document</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button 
                  onClick={() => setShowCreateResume(true)} 
                  className='bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex items-center gap-4 text-left cursor-pointer group'
                >
                  <div className='p-3.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300'>
                    <PlusIcon className='size-6'/>
                  </div>
                  <div>
                    <p className='text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300'>Start Blank</p>
                    <p className='text-xs text-slate-400 mt-0.5'>Begin building a fresh resume from scratch</p>
                  </div>
                </button>

                <button 
                  onClick={() => setShowUploadResume(true)} 
                  className='bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex items-center gap-4 text-left cursor-pointer group'
                >
                  <div className='p-3.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300'>
                    <UploadCloud className='size-6'/>
                  </div>
                  <div>
                    <p className='text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300'>Import PDF Document</p>
                    <p className='text-xs text-slate-400 mt-0.5'>Populate fields automatically using parsing AI</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Documents section */}
            <div>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Workspace Documents</h2>
                <span className='text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md'>
                  {allResumes.length} {allResumes.length === 1 ? 'Resume' : 'Resumes'}
                </span>
              </div>

              {allResumes.length === 0 ? (
                <div className='bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center text-slate-400'>
                  <FolderMinus className='size-12 stroke-1 text-slate-300 mb-3' />
                  <p className='text-sm font-semibold text-slate-700'>No Resumes Found</p>
                  <p className='text-xs text-slate-400 mt-1 max-w-xs'>Start building your first resume or import an existing PDF above.</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {allResumes.map((resume, index) => {
                    return (
                      <div 
                        key={index} 
                        onClick={() => navigate(`/app/builder/${resume._id}`)} 
                        className='relative w-full h-40 flex flex-col items-start justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer group'
                      >
                        <div className='flex items-center justify-between w-full'>
                          <div className='p-2 bg-indigo-50/80 text-indigo-600 rounded-xl'>
                            <FilePenLineIcon className='size-5'/>
                          </div>
                          
                          <div onClick={e => e.stopPropagation()} className='flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1'>
                            <button 
                              onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} 
                              className='p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-white transition-all cursor-pointer'
                              title='Edit Title'
                            >
                              <PencilIcon className='size-3.5'/>
                            </button>
                            <button 
                              onClick={() => deleteResume(resume._id)} 
                              className='p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-red-600 hover:bg-white transition-all cursor-pointer'
                              title='Delete Resume'
                            >
                              <TrashIcon className='size-3.5'/>
                            </button>
                          </div>
                        </div>

                        <div className='w-full'>
                          <p className='text-sm font-bold text-slate-800 truncate w-full group-hover:text-indigo-600 transition-colors'>{resume.title}</p>
                          <p className='text-[10px] text-slate-400 mt-1'>
                            Updated {new Date(resume.updatedAt).toLocaleDateString()} 
                          </p>
                        </div>
                      </div>
                    ) 
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: lg:col-span-4 - Sidebar (Quotas, Profile Card, Tips) */}
          <div className='lg:col-span-4 space-y-6'>
            
            {/* Resource Utilization (Quotas Tracker) */}
            <div className='bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5'>
              <div className='flex items-center justify-between border-b border-slate-100 pb-3 mb-4'>
                <div>
                  <h3 className='text-sm font-semibold text-slate-800 tracking-tight'>Resource Utilization</h3>
                  <p className='text-xs text-slate-400 mt-0.5'>Credits are managed per subscription cycle.</p>
                </div>
                <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/55 px-2.5 py-0.5 rounded-full uppercase'>FREE TIER</span>
              </div>
              
              <div className='space-y-4'>
                {/* Daily Summaries Progress */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-slate-500 flex items-center gap-1.5'><Sparkles className='size-3.5 text-indigo-600' /> AI Enhancements</span>
                    <span className='text-slate-800 font-semibold'>{10 - (user?.aiUsage?.summaryCount || 0)} / 10 left</span>
                  </div>
                  <div className='w-full h-1.5 bg-slate-100 rounded-full overflow-hidden'>
                    <div 
                      className='h-full bg-indigo-600 transition-all duration-500' 
                      style={{ width: `${Math.max(0, Math.min(100, ((10 - (user?.aiUsage?.summaryCount || 0)) / 10) * 100))}%` }}
                    />
                  </div>
                  <p className='text-[10px] text-slate-400'>Resets daily</p>
                </div>

                {/* Weekly Imports Progress */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-slate-500 flex items-center gap-1.5'><UploadCloud className='size-3.5 text-indigo-600' /> PDF CV Imports</span>
                    <span className='text-slate-800 font-semibold'>{2 - (user?.aiUsage?.parserCount || 0)} / 2 left</span>
                  </div>
                  <div className='w-full h-1.5 bg-slate-100 rounded-full overflow-hidden'>
                    <div 
                      className='h-full bg-indigo-600 transition-all duration-500' 
                      style={{ width: `${Math.max(0, Math.min(100, ((2 - (user?.aiUsage?.parserCount || 0)) / 2) * 100))}%` }}
                    />
                  </div>
                  <p className='text-[10px] text-slate-400'>Resets weekly</p>
                </div>

                {/* Monthly Photos Progress */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-slate-500 flex items-center gap-1.5'><PencilIcon className='size-3.5 text-indigo-600' /> Profile Pictures</span>
                    <span className='text-slate-800 font-semibold'>{2 - (user?.aiUsage?.imageCount || 0)} / 2 left</span>
                  </div>
                  <div className='w-full h-1.5 bg-slate-100 rounded-full overflow-hidden'>
                    <div 
                      className='h-full bg-indigo-600 transition-all duration-500' 
                      style={{ width: `${Math.max(0, Math.min(100, ((2 - (user?.aiUsage?.imageCount || 0)) / 2) * 100))}%` }}
                    />
                  </div>
                  <p className='text-[10px] text-slate-400'>Resets monthly</p>
                </div>
              </div>
            </div>

            {/* Account Profile Summary Card */}
            <div className='bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-md p-5 border border-slate-800/80 relative overflow-hidden'>
              <div className='relative z-10 space-y-4'>
                <div>
                  <h3 className='text-sm font-semibold tracking-tight text-slate-200'>Active Profile</h3>
                  <p className='text-[11px] text-slate-400 mt-0.5'>Established workspace credentials</p>
                </div>
                <div className='flex items-center gap-3.5 py-1'>
                  <div className='size-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm font-bold text-indigo-200'>
                    {user?.name?.slice(0, 2).toUpperCase() || 'SR'}
                  </div>
                  <div>
                    <p className='text-sm font-bold text-slate-100'>{user?.name}</p>
                    <p className='text-[11px] text-indigo-300 font-medium'>{user?.email}</p>
                  </div>
                </div>
                <div className='border-t border-slate-800/60 pt-3 flex items-center justify-between text-[10px] text-slate-400'>
                  <span>Registered since</span>
                  <span className='font-mono'>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              {/* Glow */}
              <div className='absolute -bottom-10 -right-10 size-28 bg-indigo-600 blur-[45px] opacity-35' />
            </div>

            {/* Workspace Help Tips */}
            <div className='bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3'>
              <h4 className='text-xs font-bold text-slate-700 uppercase tracking-wider'>Workspace Guidelines</h4>
              <ul className='space-y-2.5 text-xs text-slate-500 font-medium'>
                <li className='flex items-start gap-2'>
                  <span className='h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0'></span>
                  <span>Use <strong>AI Enhancements</strong> to polish summaries and professional experience descriptions directly in the builder.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0'></span>
                  <span>PDF imports automatically populate the editor. Make sure your upload is structured text, not scanned images.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0'></span>
                  <span>Templates are structured to satisfy standard professional recruiting formats.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {showCreateResume && (
        <div onClick={() => {setShowCreateResume(false); setTitle('')}} className='fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300'>
          <form onSubmit={createResume} onClick={e => e.stopPropagation()} className='relative bg-white border border-slate-100 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
            <div className='p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4.5'>
              <PlusIcon className='size-6'/>
            </div>
            
            <div className="mb-5">
              <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Create Resume</h2>
              <p className='text-xs text-slate-400 mt-1'>Give your new resume a name to get started.</p>
            </div>
            
            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder='e.g. Software Engineer Resume' 
              className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-5 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' 
              required
            />
            <button type="submit" className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer text-sm'>Create Resume</button>
            <XIcon className='absolute top-6 right-6 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer size-7 flex items-center justify-center' onClick={() => {setShowCreateResume(false); setTitle('')}}/>
          </form>
        </div>
      )}

      {showUploadResume && (
        <div onClick={() => {setShowUploadResume(false); setTitle(''); setResume(null)}} className='fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300'>
          <form onSubmit={uploadResume} onClick={e => e.stopPropagation()} className='relative bg-white border border-slate-100 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
            <div className='p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4.5'>
              <UploadCloud className='size-6'/>
            </div>

            <div className="mb-5">
              <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Import Resume PDF</h2>
              <p className='text-xs text-slate-400 mt-1'>Upload your existing PDF to parse details automatically using AI.</p>
            </div>

            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder='e.g. Imported Profile Name' 
              className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' 
              required
            />
            <div>
              <label htmlFor="resume-input" className='block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1'>Select PDF Document
                <div className='flex flex-col items-center justify-center gap-3 p-4 py-7 my-3 border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/10 rounded-2xl cursor-pointer text-slate-400 transition-all'>
                  {resume ? (
                    <p className='text-indigo-600 font-bold text-xs truncate max-w-full'>{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className='size-8 stroke-1 text-slate-400'/>
                      <p className='text-[10px] font-semibold text-slate-500'>Click to browse and upload PDF</p>
                    </>
                  )}
                </div>
              </label>
              <input type="file" id="resume-input" accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])}/>
            </div>
            <button type="submit" className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer text-sm flex items-center justify-center gap-2 mt-2' disabled={isLoading}>
              {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
              {isLoading ? 'Parsing Resume PDF...' : 'Upload & Import'}
            </button>
            <XIcon className='absolute top-6 right-6 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer size-7 flex items-center justify-center' onClick={() => {setShowUploadResume(false); setTitle(''); setResume(null)}}/>
          </form>
        </div>
      )}

      {editResumeId && (
        <div onClick={() => {setEditResumeId(''); setTitle('')}} className='fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300'>
          <form onSubmit={editTitle} onClick={e => e.stopPropagation()} className='relative bg-white border border-slate-100 shadow-2xl rounded-3xl w-full max-w-md p-7 overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
            <div className='p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-4.5'>
              <PencilIcon className='size-6'/>
            </div>

            <div className="mb-5">
              <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Rename Resume</h2>
              <p className='text-xs text-slate-400 mt-1'>Change the display label of this resume.</p>
            </div>

            <input 
              onChange={(e) => setTitle(e.target.value)} 
              value={title} 
              type="text" 
              placeholder='Enter resume title' 
              className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-5 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' 
              required
            />
            <button type="submit" className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer text-sm'>Rename</button>
            <XIcon className='absolute top-6 right-6 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer size-7 flex items-center justify-center' onClick={() => {setEditResumeId(''); setTitle('')}}/>
          </form>
        </div>
      )}

    </div>
  )
}

export default Dashboard