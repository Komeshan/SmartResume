import { Check, Palette } from 'lucide-react'
import React from 'react'

const ColorPicker = ({selectedColor, onChange}) => {

    const colors = [
        {name: 'Blue', value: '#3B82F6'},
        {name: 'Indigo', value: '#6366F1'},
        {name: 'Purple', value: '#8B5CF6'},
        {name: 'Green', value: '#10B981'},
        {name: 'Red', value: '#EF4444'},
        {name: 'Orange', value: '#F97316'},
        {name: 'Teal', value: '#14B8A6'},
        {name: 'Pink', value: '#EC4899'},
        {name: 'Gray', value: '#6B7280'},
        {name: 'Black', value: '#1F2937'},
        {name: 'Amber', value: '#D97706'},
        {name: 'Sky', value: '#0284C7'},
        {name: 'Emerald', value: '#059669'},
        {name: 'Rose', value: '#E11D48'},
        {name: 'Violet', value: '#7C3AED'},
        {name: 'Slate', value: '#475569'},

    ]

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
  return (
    <div className='relative' ref={ref}>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-xs'>
            <Palette size={14} className="text-slate-500" /> <span className='max-sm:hidden'>Accent Color</span>
        </button>

        {isOpen && (
            <div className='grid grid-cols-4 w-60 gap-3 absolute top-full left-0 mt-2 p-3.5 z-20 bg-white rounded-2xl border border-slate-200 shadow-xl'>
                {colors.map((color) => (
                    <div key={color.value} onClick={() => {onChange(color.value); setIsOpen(false)}} className='relative cursor-pointer group flex flex-col items-center gap-1.5'>
                        <div className='size-9 rounded-xl border border-slate-200 group-hover:scale-105 transition-all flex items-center justify-center' style={{backgroundColor: color.value}}>
                            {selectedColor === color.value && (
                                <Check className='size-4 text-white drop-shadow-xs'/>
                            )}
                        </div>
                        <p className='text-[9px] text-center font-bold text-slate-500 uppercase tracking-wide'>{color.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker