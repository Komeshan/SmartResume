import { Briefcase, Loader2, Plus, Space, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLimits } from '../app/features/authSlice'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({data, onChange}) => {

    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '', 
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value};  
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`
        
        try {
            const response = await api.post('/api/generation/enhance-job-desc', {userContent: prompt}, {headers: {Authorization: token}})
            updateExperience(index, 'description', response.data.enhancedContent)
            
            if (response.data.limits) {
                dispatch(updateLimits(response.data.limits))
                toast.success(`Job description enhanced! (${10 - response.data.limits.summaryCount}/10 remaining today)`)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setGeneratingIndex(-1)
        }
    }

  return (
    <div className='space-y-6'>
        <div className='flex justify-between items-start'>
            <div>
                <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Work Experience</h3>
                <p className='text-xs text-slate-500 mt-0.5'>Detail your past professional roles and achievements.</p>
            </div>
            <button 
                onClick={addExperience} 
                className='flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs active:scale-95'
            >
                <Plus className='size-4'/> Add Work Experience
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-slate-400'>
                <Briefcase className='w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1.25'/>
                <p className='text-sm font-semibold text-slate-700'>No work experience added yet</p>
                <p className='text-xs text-slate-400 mt-0.5'>Click "Add Work Experience" to list your job history.</p>
            </div>
        ) : (
            <div className='space-y-6'>
                {data.map((experience, index) => (
                    <div key={index} className='bg-slate-50/30 border border-slate-200/80 rounded-2xl p-5 space-y-4 hover:border-slate-300 hover:shadow-xs transition-all duration-300'>
                        <div className='flex justify-between items-center pb-2 border-b border-slate-100'>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience #{index + 1}</h4>
                            <button className='text-slate-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-slate-100/80 cursor-pointer' onClick={() => removeExperience(index)}>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3.5'>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Company Name</label>
                                <input value={experience.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} type='text' placeholder='e.g. Acme Corp' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Job Title</label>
                                <input value={experience.position || ''} onChange={(e) => updateExperience(index, 'position', e.target.value)} type='text' placeholder='e.g. Lead Developer' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Start Date</label>
                                <input value={experience.start_date || ''} onChange={(e) => updateExperience(index, 'start_date', e.target.value)} type='month' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">End Date</label>
                                <input value={experience.end_date || ''} onChange={(e) => updateExperience(index, 'end_date', e.target.value)} type='month' disabled={experience.is_current} className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 text-sm transition-all duration-200 h-10 disabled:bg-slate-100/80 disabled:text-slate-400' />
                            </div>
                        </div>

                        <label className='flex items-center gap-2 cursor-pointer select-none'>
                            <input type="checkbox" checked={experience.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked ? true : false)} className='rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 size-4' />
                            <span className='text-xs font-semibold text-slate-600'>I currently work here</span>
                        </label>

                        <div className='space-y-2 pt-1.5'>
                            <div className='flex justify-between items-center'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-wider pl-1'>Role Description</label>
                                <button 
                                    onClick={() => generateDescription(index)} 
                                    disabled={generatingIndex === index || !experience.position || !experience.company} 
                                    className='flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50 cursor-pointer shadow-xs active:scale-95'
                                >
                                    {generatingIndex === index ? (
                                        <Loader2 className='w-3 h-3 animate-spin'/>
                                    ) : (
                                        <Sparkles className='w-3 h-3' />
                                    )}
                                    Optimize with AI
                                </button>
                            </div>

                            <textarea value={experience.description || ''} onChange={(e) => updateExperience(index, 'description', e.target.value)} rows={4} className='w-full p-3.5 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm rounded-xl transition-all duration-200 resize-none' placeholder='Describe your achievements and key responsibilities in this role...' />
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm