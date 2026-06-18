import { Plus, Trash2, FolderGit2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data, onChange}) => {

    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: ''
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value};  
        onChange(updated)
    }

  return (
    <div className='space-y-6'>
        <div className='flex justify-between items-start'>
            <div>
                <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Projects</h3>
                <p className='text-xs text-slate-500 mt-0.5'>List your notable personal or professional projects.</p>
            </div>
            <button 
                onClick={addProject} 
                className='flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs active:scale-95'
            >
                <Plus className='size-4'/> Add Project
            </button>
        </div>

        {data.length === 0 ? (
            <div className='text-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-slate-400'>
                <FolderGit2 className='w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1.25'/>
                <p className='text-sm font-semibold text-slate-700'>No projects added yet</p>
                <p className='text-xs text-slate-400 mt-0.5'>Click "Add Project" to list your projects.</p>
            </div>
        ) : (
            <div className='space-y-6'>
                {data.map((project, index) => (
                    <div key={index} className='bg-slate-50/30 border border-slate-200/80 rounded-2xl p-5 space-y-4 hover:border-slate-300 hover:shadow-xs transition-all duration-300'>
                        <div className='flex justify-between items-center pb-2 border-b border-slate-100'>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project #{index + 1}</h4>
                            <button className='text-slate-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-slate-100/80 cursor-pointer' onClick={() => removeProject(index)}>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid gap-3.5'>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Project Name</label>
                                <input value={project.name || ''} onChange={(e) => updateProject(index, 'name', e.target.value)} type='text' placeholder='e.g. SMART Resume Engine' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Technologies Used</label>
                                <input value={project.type || ''} onChange={(e) => updateProject(index, 'type', e.target.value)} type='text' placeholder='e.g. React, Node.js, MongoDB' className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Project Description</label>
                                <textarea rows={4} value={project.description || ''} onChange={(e) => updateProject(index, 'description', e.target.value)} placeholder="Describe the project's purpose, your role, and the technologies used..." className='w-full p-3.5 bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm rounded-xl transition-all duration-200 resize-none' />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ProjectForm