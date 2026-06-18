import React from 'react'

const Features = () => {
  return (
    <div id='features' className= 'scroll-mt-12 bg-slate-50/50 py-16 border-t border-slate-100'>
        <section className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center gap-4">
            
            <h2 className="text-3xl md:text-[34px] font-extrabold text-slate-800 max-w-lg text-center leading-tight">Build with Professional Guardrails</h2>
            <p className='text-sm md:text-base text-slate-500 max-w-xl text-center'>Create outstanding, structured portfolios using automated AI summaries, real-time client-side rendering, and customizable workspace tools.</p>
            
            <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>AI-Powered Text Optimization</p>
                    <p className='text-xs/5 text-slate-500'>Refine grammar, professional phrasing, and active verbs instantly. Tailor summary components to align with industry expectations.</p>
                </div>
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>Real-Time Layout Worksheet</p>
                    <p className='text-xs/5 text-slate-500'>See formatting adjustments live as you type. Real-time preview allows you to manage margins, section spacing, and layout balance instantly.</p>
                </div>
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>Integrated Structure Control</p>
                    <p className='text-xs/5 text-slate-500'>Automatically arrange content into modern templates designed to ensure standard spacing and compatibility with modern recruiting systems.</p>
                </div>
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>Client-Side Document Parsing</p>
                    <p className='text-xs/5 text-slate-500'>Import raw text from existing PDF resumes directly inside the browser. Save backend processing load and parse data into custom sections.</p>
                </div>
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>Style Configurations</p>
                    <p className='text-xs/5 text-slate-500'>Configure professional templates and custom accent colors with simple, responsive toggles that dynamically paint your worksheets.</p>
                </div>
                <div className='bg-white border border-slate-200/80 rounded-2xl p-6 space-y-2.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition duration-300'>
                    <p className='font-bold text-base text-slate-800'>Direct Digital Sharing</p>
                    <p className='text-xs/5 text-slate-500'>Download clean PDF print layers or toggle public URL indexes to share digital assets directly with recruiting managers.</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Features