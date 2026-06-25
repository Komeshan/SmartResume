import { BriefcaseBusiness, Globe, Mail, MapPin, Phone, User, Handshake  } from 'lucide-react'
import toast from 'react-hot-toast'

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const handleImageError = (e) => {
        const src = e.target.src;
        if (src.includes(',e-bgremove')) {
            e.target.src = src.replace(',e-bgremove', '');
        } else if (src.includes('e-bgremove,')) {
            e.target.src = src.replace('e-bgremove,', '');
        } else if (src.includes('?tr=e-bgremove')) {
            e.target.src = src.replace('?tr=e-bgremove', '');
        } else if (src.includes('&tr=e-bgremove')) {
            e.target.src = src.replace('&tr=e-bgremove', '');
        } else if (src.includes('tr=e-bgremove')) {
            e.target.src = src.replace('tr=e-bgremove', '');
        }
    }

    const fields = [
        {key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true},
        {key: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true},
        {key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: true},
        {key: 'location', label: 'Location', icon: MapPin, type: 'text', required: true},
        {key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text', required: true},
        {key: 'linkedin', label: 'LinkedIn', icon: Handshake, type: 'url', required: false},
        {key: 'website', label: 'Website', icon: Globe, type: 'url', required: false},
    ]

  return (
    <div className="space-y-6">
        <div>
            <h3 className='text-sm font-bold text-slate-800 tracking-tight'>Personal Information</h3>
            <p className='text-xs text-slate-500 mt-0.5'>Provide your key contact info for the resume header.</p>
        </div>

        <div className='flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60'>
            <label className="cursor-pointer">
                {data.image && data.image !== 'undefined' && data.image !== 'null' ? (
                    <div className="relative group">
                        <img 
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
                            alt="" 
                            onError={handleImageError}
                            className='w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/10 hover:opacity-80 transition-all'
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-white font-bold">Edit</span>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center size-16 border border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all'>
                        <User className='size-6 stroke-1.5' />
                        <span className="text-[8px] font-bold mt-1">Upload</span>
                    </div>
                )}
                <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                            toast.error("File size limit exceeded. Maximum upload limit is 5MB.");
                            e.target.value = "";
                            return;
                        }
                        handleChange('image', file);
                    }
                }}/>
            </label>
            {data.image && data.image !== 'undefined' && data.image !== 'null' && (
                <div className='flex flex-col gap-1 pl-2 text-xs'>
                    <span className="font-semibold text-slate-700">Remove background</span>
                    <label className='relative inline-flex items-center cursor-pointer text-slate-900 gap-3 mt-1'>
                        <input type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground}/>
                        <div className='w-8 h-4.5 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200'></div>
                        <span className='dot absolute left-0.5 top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-3.5 shadow-xs'></span>
                    </label>
                    <p className='text-[8.5px] text-slate-400 mt-1 leading-normal max-w-[200px]'>
                        Note: Requires the Background Removal extension to be active in your ImageKit dashboard.
                    </p>
                </div>
            )}
        </div>

        <div className="space-y-4">
            {fields.map((field) => {
                const Icon = field.icon
                return (
                    <div key={field.key} className='space-y-1'>
                        <label className='flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1'>
                            <Icon className='size-3.5 text-slate-400'/>{field.label} {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        <input 
                            type={field.type} 
                            value={data[field.key] || ''} 
                            onChange={(e) => handleChange(field.key, e.target.value)} 
                            className='w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 placeholder-slate-400 text-sm transition-all duration-200 h-10' 
                            placeholder={`Enter your ${field.label.toLowerCase()}`} 
                            required={field.required}
                        />
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default PersonalInfoForm