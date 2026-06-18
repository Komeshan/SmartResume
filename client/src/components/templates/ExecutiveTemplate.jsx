import React from 'react'
import { Mail, Phone, MapPin, Handshake, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white text-slate-800 leading-relaxed text-xs md:text-sm font-light">
            {/* Header Top Line */}
            <div className="h-1 w-full mb-6" style={{ backgroundColor: accentColor }}></div>

            {/* Header info (Centered) */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-wide uppercase text-slate-900 mb-1">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4" style={{ color: accentColor }}>
                    {data.personal_info?.profession || "Profession"}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-4 text-xs text-slate-500 border-t border-b border-slate-100 py-2.5 max-w-2xl mx-auto">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Handshake className="size-3" style={{ color: accentColor }} />
                            <span>{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3" style={{ color: accentColor }} />
                            <span>{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Summary */}
            {data.professional_summary && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-200 pb-1">
                        Executive Overview
                    </h2>
                    <p className="text-slate-600 leading-relaxed">{data.professional_summary}</p>
                </div>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Professional Background
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{exp.position}</h3>
                                        <p className="text-xs font-medium text-slate-500">{exp.company}</p>
                                    </div>
                                    <span className="text-xs text-slate-400 font-semibold uppercase text-right shrink-0">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
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
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Key Accomplishments
                    </h2>
                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="space-y-0.5">
                                <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Academic Credentials
                    </h2>
                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">{edu.institution}</p>
                                    {edu.gpa && <p className="text-xs text-slate-400">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-xs text-slate-400 font-semibold uppercase text-right shrink-0">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-200 pb-1">
                        Core Competencies
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-600 text-xs md:text-sm">
                        {data.skills.map((skill, index) => (
                            <span key={index}>• {skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExecutiveTemplate
