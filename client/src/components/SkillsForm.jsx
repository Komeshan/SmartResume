import { Plus, Sparkles, X } from 'lucide-react'
import React from 'react'

const SkillsForm = ({data, onChange}) => {

    const [newSkill, setNewSkill] = React.useState('')

    const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()])
            setNewSkill('')
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault()
            addSkill()
        }
    }

  return (
    <div className='space-y-4'>
        <div>
            <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Skills</h3>
            <p className='text-xs text-slate-500 mt-0.5'>List your key technical, professional, or soft skills.</p>
        </div>

        <div className='flex gap-2'>
            <input 
                type="text" 
                placeholder='e.g. JavaScript, React, SQL, Project Management' 
                onChange={(e) => setNewSkill(e.target.value)} 
                value={newSkill} 
                onKeyDown={handleKeyPress} 
                className='flex-1 px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10'
            />
            <button 
                onClick={addSkill} 
                disabled={!newSkill.trim()} 
                className='flex items-center gap-1.5 px-4.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm text-xs font-bold active:scale-95'
            >
                <Plus className='size-4'/> Add
            </button>
        </div>

        {data.length > 0  ? (
            <div className='flex flex-wrap gap-2 pt-2'>
                {data.map((skill, index) => (
                    <span key={index} className='flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100/60 text-indigo-700 rounded-full text-xs font-semibold'>
                        {skill}
                        <button onClick={() => removeSkill(index)} className='hover:bg-indigo-100 rounded-full p-0.5 transition-colors cursor-pointer'>
                            <X className='w-3 h-3 text-indigo-500'/>
                        </button>
                    </span>
                ))}
            </div>
        ) : (
            <div className='text-center py-8 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-slate-400'>
                <Sparkles className='w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1.25 animate-pulse'/>
                <p className='text-sm font-semibold text-slate-700'>No skills added yet</p>
                <p className='text-xs text-slate-400 mt-0.5'>Enter a skill above and click Add or press Enter.</p>
            </div>
        )}

        <div className='bg-indigo-50/40 border border-indigo-100/60 p-3.5 rounded-xl'>
            <p className='text-[10px] text-indigo-800 leading-relaxed'>
                <strong>Quick Tip:</strong> List 6-10 keywords that represent your main technical and professional skills.
            </p>
        </div>
    </div>
  )
}

export default SkillsForm