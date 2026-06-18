import { Check, Layout } from 'lucide-react'
import React from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const ref = React.useRef(null)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('touchstart', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('touchstart', handleClickOutside, true)
        }
    }, [])



    const templates = [
        {
            id: 'classic',
            name: 'Classic',
            preview: 'A clean, traditional resume layout with clear sections and professional typography.'
        },

        {
            id: 'modern',
            name: 'Modern',
            preview: 'A sleek design with strategic use of color and modern font choices to make your resume stand out.'
        },

        {
            id: 'minimal-image',
            name: 'Minimal Image',
            preview: 'Minimal design with a profile image container and clean typography for a contemporary look.'
        },

        {
            id: 'minimal',
            name: 'Minimal',
            preview: 'Ultra clean design that puts your content front and center with minimal distractions.'
        },

        {
            id: 'professional',
            name: 'Professional',
            preview: 'A structured layout with date columns and a neat divider line ideal for corporate roles.'
        },

        {
            id: 'creative',
            name: 'Creative Sidebar',
            preview: 'An asymmetric two-column sidebar layout featuring a left colored accent pane.'
        },

        {
            id: 'executive',
            name: 'Executive Center',
            preview: 'Centered corporate layout with a prominent header accent bar and clean alignments.'
        },
        
    ]

  return (
    <div className='relative' ref={ref}>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-xs'>
            <Layout size={14} className="text-slate-500" /> <span className='max-sm:hidden'>Select Template</span>
        </button>
        {isOpen && (
            <div className='absolute top-full left-0 w-[300px] p-3 mt-2 space-y-2.5 z-20 bg-white rounded-2xl border border-slate-200/80 shadow-xl max-h-[380px] overflow-y-auto'>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Choose Layout</h4>
                {templates.map((template) => (
                    <div key={template.id} onClick={() => {onChange(template.id); setIsOpen(false)}} className={`relative p-3 rounded-xl cursor-pointer border transition-all ${selectedTemplate === template.id ? 'border-indigo-500 bg-indigo-50/40' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'}`}>
                        {selectedTemplate === template.id && (
                            <div className="absolute top-2.5 right-2.5">
                                <div className='size-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-xs'> 
                                    <Check className='w-3 h-3 text-white'/>
                                </div>
                            </div>
                        )}

                        <div className='space-y-1.5'>
                            <h4 className={`text-xs font-bold ${selectedTemplate === template.id ? 'text-indigo-600' : 'text-slate-700'}`}>{template.name}</h4>
                            <div className='text-[10px] leading-relaxed text-slate-500 mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100'>{template.preview}</div>
                        </div>
                    </div >
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector