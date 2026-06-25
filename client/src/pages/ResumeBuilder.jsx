import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOff, FileText, FoldersIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector, useDispatch } from 'react-redux'
import { updateLimits } from '../app/features/authSlice'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [ resumeData, setResumeData] = useState({
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
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = `${data.resume.title} | SMART Resume Builder`
        if (data.resume.personal_info?.image && typeof data.resume.personal_info.image === 'string') {
          setRemoveBackground(data.resume.personal_info.image.includes(',e-bgremove'))
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)

      //remove image from updated resume data if it is a File object
      if (resumeData.personal_info && typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append('removeBackground', 'yes')
      
      typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image)
      
      
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      
      setResumeData(data.resume)
      if (data.limits) {
        dispatch(updateLimits(data.limits))
      }
      toast.success(data.message)
    } catch (error) {
      console.error(error.message)
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    {id: 'personal', name: 'Personal Info', icon: User},
    {id: 'summary', name: 'Summary', icon: FileText},
    {id: 'experience', name: 'Experience', icon: Briefcase},
    {id: 'education', name: 'Education', icon: GraduationCap},
    {id: 'projects', name: 'Projects', icon: FoldersIcon},
    {id: 'skills', name: 'Skills', icon: Sparkles},
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    if (token) {
      loadExistingResume()
    }
  }, [token])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify({public: !resumeData.public}))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({...resumeData, public: !resumeData.public})
      if (data.limits) {
        dispatch(updateLimits(data.limits))
      }
      toast.success(`Resume visibility set to ${!resumeData.public ? 'Public' : 'Private'}`)
    } catch (error) {
      console.error('Error saving the resume:', error)
      toast.error('Failed to change resume visibility')
    }
  }

  const handleShare = async () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    try {
      if (!navigator.share) {
        await navigator.clipboard.writeText(resumeUrl);
        toast.success("Share link copied to clipboard!");
        return;
      }

      await navigator.share({
        title: "My Resume",
        text: "Check this out",
        url: resumeUrl,
      });

    } catch (err) {
      console.log("Share error:", err);
      if (err.name !== "AbortError") {
        await navigator.clipboard.writeText(resumeUrl);
        toast.success("Share link copied to clipboard!");
      }
    }
  };
 
  const downloadResume = () => {
    window.print()
  }

  const calculateScore = () => {
    let score = 0;
    const items = [];
    
    // Photo
    if (resumeData.personal_info?.image && resumeData.personal_info.image !== 'undefined' && resumeData.personal_info.image !== 'null') {
      score += 15;
    } else {
      items.push("Add a profile picture");
    }
    
    // Summary
    if (resumeData.professional_summary && resumeData.professional_summary.length > 50) {
      score += 15;
    } else {
      items.push("Write a profile summary (50+ chars)");
    }
    
    // Experience
    if (resumeData.experience && resumeData.experience.length >= 2) {
      score += 25;
    } else if (resumeData.experience && resumeData.experience.length === 1) {
      score += 15;
      items.push("Add one more job record");
    } else {
      items.push("Add 2+ job records");
    }
    
    // Education
    if (resumeData.education && resumeData.education.length >= 1) {
      score += 20;
    } else {
      items.push("Add your academic credentials");
    }
    
    // Projects
    if (resumeData.project && resumeData.project.length >= 1) {
      score += 15;
    } else {
      items.push("Add a key project highlight");
    }
    
    // Skills
    if (resumeData.skills && resumeData.skills.length >= 5) {
      score += 10;
    } else {
      items.push("List 5+ expertise tags");
    }
    
    return { score, items };
  };

  return (
    <div className='min-h-screen bg-slate-50/50 pb-16'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-200/80 bg-white rounded-2xl shadow-xs mt-4 mb-6'>
        <div className='flex items-center gap-3.5'>
          <div className='p-2 bg-indigo-50 text-indigo-600 rounded-xl'>
            <FileText className='size-5' />
          </div>
          <div>
            <h1 className='text-base font-extrabold text-slate-800 tracking-tight leading-none'>{resumeData.title || 'Untitled Resume'}</h1>
            <p className='text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1'>SMART Workspace Editor</p>
          </div>
        </div>
        
        {/* Save Badge indicator */}
        <div className='text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100'>
          <span className='h-1.5 w-1.5 rounded-full bg-indigo-500'></span>
          Autosaved
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-6 items-start'>
          
          {/* Column 1: Slim Active Section Sidebar */}
          <div className='w-full lg:w-20 shrink-0 bg-slate-900 p-3 py-6 rounded-2xl flex lg:flex-col items-center justify-between lg:justify-start gap-4 shadow-lg border border-slate-800'>
            {sections.map((sec, idx) => {
              const Icon = sec.icon
              const isActive = idx === activeSectionIndex
              return (
                <button 
                  key={sec.id} 
                  onClick={() => setActiveSectionIndex(idx)} 
                  title={sec.name}
                  className={`relative p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center group ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                >
                  <Icon className='size-5' />
                </button>
              )
            })}
          </div>

          {/* Column 2: Form Inputs Card */}
          <div className='w-full lg:max-w-md xl:max-w-lg flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden'>
            {/* progress bar */}
            <div className='w-full bg-slate-100 h-1 relative'>
              <div className='absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-300' style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}} />
            </div>

            <div className='p-6'>
              {/* Live Strength Score Card */}
              {(() => {
                const { score, items } = calculateScore();
                let scoreColor = 'bg-red-500';
                let scoreBg = 'bg-red-50 text-red-700 border-red-100/50';
                if (score >= 80) {
                  scoreColor = 'bg-emerald-500';
                  scoreBg = 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
                } else if (score >= 40) {
                  scoreColor = 'bg-amber-500';
                  scoreBg = 'bg-amber-50 text-amber-700 border-amber-100/50';
                }
                return (
                  <div className='mb-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border ${scoreBg}`}>
                        Profile Strength: {score}%
                      </span>
                      <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider'>Live Audit</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className='w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-3'>
                      <div className={`h-full ${scoreColor} transition-all duration-500`} style={{ width: `${score}%` }} />
                    </div>

                    {/* Suggestions List */}
                    {items.length > 0 && (
                      <div className='mt-3.5 pt-3 border-t border-slate-200/40'>
                        <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2'>Improvement checklist</p>
                        <ul className='space-y-1.5'>
                          {items.map((item, index) => (
                            <li key={index} className='text-[10.5px] text-slate-500 flex items-center gap-2 font-medium'>
                              <span className='size-1.5 bg-indigo-500 rounded-full shrink-0' />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Controls Header */}
              <div className='flex justify-between items-center mb-6 border-b border-slate-100 pb-3'>
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({...prev, template}))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({...prev, accent_color: color}))} />
                </div>
                
                <div className='flex items-center gap-1'>
                  {activeSectionIndex > 0 && (
                    <button onClick={() => setActiveSectionIndex(prev => prev - 1)} className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer'>
                      <ChevronLeft className='size-3.5' /> Prev
                    </button>
                  )}
                  {activeSectionIndex < sections.length - 1 && (
                    <button onClick={() => setActiveSectionIndex(prev => prev + 1)} className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer'>
                      Next <ChevronRight className='size-3.5' />
                    </button>
                  )}
                </div>
              </div>

              {/* Active Component */}
              <div className='space-y-6 min-h-[300px]'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setResumeData} />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))} />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))} />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({...prev, project: data}))} />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))} />
                )}
              </div>

              <button onClick={() => {toast.promise(saveResume, {loading: 'Saving...'})}} className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all mt-6 shadow-sm active:scale-[0.99] cursor-pointer'>
                Save Progress
              </button>
            </div>
          </div>

          {/* Column 3: Live Preview Viewer */}
          <div className='w-full lg:flex-1'>
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>

        </div>
      </div>

      {/* Floating Action Bar */}
      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-800 shadow-2xl transition-all duration-300 hover:bg-slate-900'>
        <Link to='/app' className='p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0 border border-slate-700/50' title='Return to Dashboard'>
          <ArrowLeftIcon className='size-4' />
        </Link>
        <div className='h-5 w-px bg-slate-800' />
        
        {resumeData.public && (
          <button onClick={handleShare} className='flex items-center py-2 px-3.5 gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer transition-all active:scale-[0.98] border border-slate-700/50'>
            <Share2Icon className='size-3.5 text-slate-400'/> <span>Share</span>
          </button>
        )}

        <button onClick={changeResumeVisibility} className='flex items-center py-2 px-3.5 gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer transition-all active:scale-[0.98] border border-slate-700/50'>
          {resumeData.public ? <EyeIcon className='size-3.5 text-emerald-400'/> : <EyeOff className='size-3.5 text-slate-500'/>}
          <span>{resumeData.public ? 'Public' : 'Private'}</span>
        </button>

        <button onClick={downloadResume} className='flex items-center py-2 px-4.5 gap-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20'>
          <DownloadIcon className='size-3.5 text-indigo-300'/> <span>Download</span>
        </button>
      </div>

    </div>
  )
}

export default ResumeBuilder