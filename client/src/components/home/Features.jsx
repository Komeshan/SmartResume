import React from 'react'

const Features = () => {
  return (
    <div id='features' className= 'scroll-mt-12'>
        <section class="py-2 px-4 pb-20 bg-white-50 flex flex-col justify-center items-center gap-6">
            
            <h2 class="text-3xl md:text-[40px]/12 font-medium text-black-600 max-w-lg text-center leading-tight">Build your resume with confidence.</h2>
            <p class='text-base/7 text-gray-600 max-w-xl text-center'>Create professional, ATS-optimized resumes in minutes using AI-powered suggestions, real-time preview, and smart customization tools, all in one platform.</p>
            <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                    
                    <p class='font-medium text-lg text-gray-100'>AI Resume Enhancement</p>
                    <p class='text-sm/5 text-gray-200'>Improve your resume instantly with AI suggestions that refine grammar, tone, and wording to make your experience sound more professional and impactful.</p>
                </div>
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                    
                    <p class='font-medium text-lg text-gray-100'>Real-Time Resume Preview</p>
                    <p class='text-sm/5 text-gray-200'>See your resume update instantly as you type. Understand layout, formatting, and content balance while building your CV.</p>
                </div>
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                    
                    <p class='font-medium text-lg text-gray-100'>ATS Optimization Support</p>
                    <p class='text-sm/5 text-gray-200'>Automatically optimize your resume with relevant keywords and structured formatting to increase chances of passing Applicant Tracking Systems.</p>
                </div>
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                    
                    <p class='font-medium text-lg text-gray-100'>Resume Import & Upgrade System</p>
                    <p class='text-sm/5 text-gray-200'>Upload an existing CV and convert it into a modern, structured, and optimized resume using AI enhancement.</p>
                </div>
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                    
                    <p class='font-medium text-lg text-gray-100'>Resume Customization Tools</p>
                    <p class='text-sm/5 text-gray-200'>Personalize your resume with professional templates, theme colors, and layout options to match your personal branding.</p>
                </div>
                <div class='bg-gradient-to-r bg-blue-950 border border-gray-700 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
                   
                    <p class='font-medium text-lg text-gray-100'>Instant Sharing & Export</p>
                    <p class='text-sm/5 text-gray-200'>Download your resume as a PDF or generate a shareable link to send directly to recruiters and employers.</p>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Features