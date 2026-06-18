import React from 'react'
import { Mail, Phone, MapPin, Handshake, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

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

    return (
        <div className="max-w-4xl mx-auto bg-white text-slate-800 grid grid-cols-1 md:grid-cols-12 min-h-[11in] text-sm leading-relaxed">
            {/* Sidebar Column (Left) */}
            <div className="md:col-span-4 p-8 border-r border-slate-100 flex flex-col gap-6" style={{ background: `${accentColor}08` }}>
                
                {/* Profile Photo */}
                {data.personal_info?.image && data.personal_info.image !== 'undefined' && data.personal_info.image !== 'null' && (
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2" style={{ borderColor: accentColor }}>
                        <img src={data.personal_info.image} onError={handleImageError} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Name */}
                <div className="text-center md:text-left">
                    <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1" style={{ color: accentColor }}>
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Contact details */}
                <div className="space-y-3.5 text-xs text-slate-600">
                    <h3 className="font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200" style={{ color: accentColor }}>Contact Info</h3>
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4 shrink-0" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4 shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4 shrink-0" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Handshake className="size-4 shrink-0" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="size-4 shrink-0" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200" style={{ color: accentColor }}>Core Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-0.5 text-xs bg-white border border-slate-200 text-slate-700 rounded font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content Column (Right) */}
            <div className="md:col-span-8 p-8 flex flex-col gap-6">
                
                {/* Summary */}
                {data.professional_summary && (
                    <div className="space-y-2">
                        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase pb-1 border-b border-slate-100">Summary</h2>
                        <p className="text-slate-600 leading-relaxed text-xs md:text-sm">{data.professional_summary}</p>
                    </div>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase pb-1 border-b border-slate-100">Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                                        <span className="text-[11px] text-slate-400 font-semibold uppercase">
                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-500">{exp.company}</p>
                                    {exp.description && (
                                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1 whitespace-pre-line">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase pb-1 border-b border-slate-100">Projects</h2>
                        <div className="space-y-3">
                            {data.project.map((proj, index) => (
                                <div key={index} className="space-y-1">
                                    <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase pb-1 border-b border-slate-100">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div className="space-y-0.5">
                                        <h3 className="font-bold text-slate-900 text-sm">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">{edu.institution}</p>
                                        {edu.gpa && <p className="text-xs text-slate-400">GPA: {edu.gpa}</p>}
                                    </div>
                                    <span className="text-[11px] text-slate-400 font-semibold uppercase">{formatDate(edu.graduation_date)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreativeTemplate
