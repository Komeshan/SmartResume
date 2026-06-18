import React from 'react'
import { Mail, Phone, MapPin, Handshake, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white text-slate-800 leading-relaxed text-sm">
            {/* Header info */}
            <div className="border-b pb-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 mb-1">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-base font-semibold uppercase tracking-wider text-slate-500" style={{ color: accentColor }}>
                            {data.personal_info?.profession || "Profession"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-500">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-1.5">
                                <Mail className="size-3.5" style={{ color: accentColor }} />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="size-3.5" style={{ color: accentColor }} />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="size-3.5" style={{ color: accentColor }} />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center gap-1.5">
                                <Handshake className="size-3.5" style={{ color: accentColor }} />
                                <span>{data.personal_info.linkedin}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-center gap-1.5">
                                <Globe className="size-3.5" style={{ color: accentColor }} />
                                <span>{data.personal_info.website}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary */}
            {data.professional_summary && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Summary</h2>
                    <p className="text-slate-600 leading-relaxed text-xs md:text-sm">{data.professional_summary}</p>
                </div>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Experience</h2>
                    <div className="space-y-5">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                                <div className="md:col-span-3 text-xs text-slate-500 font-semibold uppercase pt-0.5">
                                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                </div>
                                <div className="md:col-span-9">
                                    <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                                    <p className="text-xs font-medium text-slate-500 mb-2">{exp.company}</p>
                                    {exp.description && (
                                        <p className="text-xs md:text-sm text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Projects</h2>
                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                                <div className="md:col-span-3 text-xs text-slate-500 font-semibold uppercase pt-0.5">
                                    Project #{index + 1}
                                </div>
                                <div className="md:col-span-9">
                                    <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                                    <p className="text-xs md:text-sm text-slate-600 mt-1">{proj.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                                <div className="md:col-span-3 text-xs text-slate-500 font-semibold uppercase pt-0.5">
                                    {formatDate(edu.graduation_date)}
                                </div>
                                <div className="md:col-span-9">
                                    <h3 className="font-bold text-slate-900 text-sm">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-500">{edu.institution}</p>
                                    {edu.gpa && <p className="text-xs text-slate-400 mt-0.5">GPA: {edu.gpa}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfessionalTemplate
