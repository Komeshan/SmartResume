import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLimits } from '../app/features/authSlice'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isGenerating, setIsGenerating] = useState(false)

    const generateSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `enhance my professional summary '${data}'`;
            const response = await api.post('/api/generation/enhance-pro-sum', {userContent: prompt}, {headers: {Authorization: token}})
            setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
            
            if (response.data.limits) {
                dispatch(updateLimits(response.data.limits))
                toast.success(`Summary optimized! (${10 - response.data.limits.summaryCount}/10 remaining today)`)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        finally{
            setIsGenerating(false)
        }
    }

  return (
    <div className='space-y-4'>
        <div className='flex justify-between items-start'>
            <div>
                <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Professional Summary</h3>
                <p className='text-xs text-slate-500 mt-0.5'>Outline your career highlights and core expertise.</p>
            </div>
            <button 
                disabled={isGenerating} 
                onClick={generateSummary} 
                className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs active:scale-95'
            >
                {isGenerating ? (<Loader2 className='size-3.5 animate-spin'/>) : (<Sparkles className='size-3.5'/> )}
                {isGenerating ? 'Enhancing...' : 'Optimize with AI'}
            </button>
        </div>

        <div className='mt-6'>
            <textarea 
                value={data || ''} 
                onChange={(e) => onChange(e.target.value)} 
                rows={7} 
                className='w-full p-3.5 px-4 mt-2 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm rounded-xl transition-all duration-200 resize-none' 
                placeholder='Type or paste your professional summary. Use AI to improve it...' 
            />
            <div className='mt-3 bg-indigo-50/40 border border-indigo-100/60 p-3 rounded-xl'>
                <p className='text-[10px] text-indigo-800 leading-relaxed'>
                    <strong>Quick Tip:</strong> Aim for 3-4 sentences highlighting your key achievements and core career focus.
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm