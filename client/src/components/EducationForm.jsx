import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            graduation_date: '',
            gpa: ''
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value};  
        onChange(updated)
    }

  return (
    <div className='space-y-6'>
        <div className='flex justify-between items-start'>
            <div>
                <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Education</h3>
                <p className='text-xs text-slate-500 mt-0.5'>List your degrees, institutions, and graduation dates.</p>
            </div>
            <button 
                onClick={addEducation} 
                className='flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs active:scale-95'
            >
                <Plus className='size-4'/> Add Education
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-slate-400'>
                <GraduationCap className='w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1.25'/>
                <p className='text-sm font-semibold text-slate-700'>No education added yet</p>
                <p className='text-xs text-slate-400 mt-0.5'>Click "Add Education" to list your academic history.</p>
            </div>
        ) : (
            <div className='space-y-6'>
                {data.map((education, index) => (
                    <div key={index} className='bg-slate-50/30 border border-slate-200/80 rounded-2xl p-5 space-y-4 hover:border-slate-300 hover:shadow-xs transition-all duration-300'>
                        <div className='flex justify-between items-center pb-2 border-b border-slate-100'>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education #{index + 1}</h4>
                            <button className='text-slate-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-slate-100/80 cursor-pointer' onClick={() => removeEducation(index)}>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3.5'>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">School / University</label>
                                <input value={education.institution || ''} onChange={(e) => updateEducation(index, 'institution', e.target.value)} type='text' placeholder='e.g. Stanford University' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Degree</label>
                                <input value={education.degree || ''} onChange={(e) => updateEducation(index, 'degree', e.target.value)} type='text' placeholder='e.g. Bachelor of Science' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Field of Study</label>
                                <input value={education.field || ''} onChange={(e) => updateEducation(index, 'field', e.target.value)} type='text' placeholder='e.g. Computer Science' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Graduation Date</label>
                                <input value={education.graduation_date || ''} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} type='month' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 text-sm transition-all duration-200 h-10' />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">GPA / Grade (Optional)</label>
                            <input value={education.gpa || ''} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} type='text' placeholder='e.g. 3.8 / 4.0' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                        </div>

                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default EducationForm