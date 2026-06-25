import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'


const ResumePreview = ({data,template, accentColor, classes = ''}) => {

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} accentColor={accentColor}/>;
            case 'minimal':
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case 'minimal-image':
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
            case 'professional':
                return <ProfessionalTemplate data={data} accentColor={accentColor}/>;
            case 'creative':
                return <CreativeTemplate data={data} accentColor={accentColor}/>;
            case 'executive':
                return <ExecutiveTemplate data={data} accentColor={accentColor}/>;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }

  return (
    <div className='w-full bg-gray-100'>
        <div id='resume-preview' className={`border border-gray-200 print:shadow-none print:border-none relative + ${classes}`}>
            {renderTemplate()}
            
            <div 
                className="hidden print:block print:absolute print:top-0 print:left-0 print:text-[1px] print:leading-none print:pointer-events-none" 
                style={{ color: '#ffffff', fontSize: '1px', whiteSpace: 'nowrap', wordBreak: 'keep-all', pointerEvents: 'none', zIndex: -9999, opacity: 0.05 }}
            >
                RAW_METADATA_START
                IMAGE_URL: {typeof data?.personal_info?.image === 'string' ? data.personal_info.image : 'none'}
                LINKEDIN_URL: {data?.personal_info?.linkedin || 'none'}
                WEBSITE_URL: {data?.personal_info?.website || 'none'}
                {data?.project?.map((proj, idx) => (
                    <span key={idx}>
                        {` PROJECT_START PROJECT_NAME: ${proj.name || 'none'} PROJECT_TYPE: ${proj.type || 'none'} PROJECT_DESC: ${proj.description || 'none'} PROJECT_END`}
                    </span>
                ))}
                RAW_METADATA_END
            </div>
        </div>

        <style>
            {`
                @page {
                    size: letter;
                    margin: 0;
                } 
                @media print {
                    html, body {
                        width: 8.5in;
                        height: 11in;
                        overflow: hidden;
                    }
                    body {
                        visibility: hidden;
                    }
                    #resume-preview, #resume-preview *{
                        visibility: visible;
                    }
                    #resume-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin: 0;
                        box-shadow: none !important;
                        width: 100%;
                        height: auto;
                        padding: 0;
                        border: none !important;
                    }
                } 
            `}
        </style>
    </div>
  )
}

export default ResumePreview