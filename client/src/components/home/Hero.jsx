import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { Briefcase, CheckCircle, FileText, Sparkles, Wand2 } from 'lucide-react';

const Hero = () => {
    const { user } = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <div className="pb-24 bg-slate-50/30">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white border-b border-slate-100">
                    <Link to="/">
                        <Logo className="h-8" />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-slate-500 font-semibold">
                        <Link to="/" className="hover:text-indigo-600 transition">Builder</Link>
                        <a href="#features" className="hover:text-indigo-600 transition">Key Features</a>
                        <a href="mailto:support@smartresume.com" className="hover:text-indigo-600 transition">Contact Support</a>
                    </div>

                    <div className="flex gap-3">
                        <Link to='/app?state=register' className="hidden md:block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all rounded-xl text-white font-semibold shadow-xs" hidden={user}>
                            Start Building
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-5 py-2.5 border border-slate-200 active:scale-95 hover:bg-slate-50 transition-all rounded-xl text-slate-600 hover:text-slate-800 font-semibold" hidden={user}>
                            Sign In
                        </Link>
                        <Link to='/app' className='hidden md:block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all rounded-xl text-white font-semibold shadow-xs' hidden={!user}>
                            Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-slate-700" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-slate-900/90 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <Link to="/" className="text-white font-medium hover:text-indigo-400 transition" onClick={() => setMenuOpen(false)}>Builder</Link>
                    <a href="#features" className="text-white font-medium hover:text-indigo-400 transition" onClick={() => setMenuOpen(false)}>Key Features</a>
                    <a href="mailto:support@smartresume.com" className="text-white font-medium hover:text-indigo-400 transition" onClick={() => setMenuOpen(false)}>Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-2 active:ring-indigo-500 size-10 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-xl flex font-bold" >
                        ✕
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Wording & Actions */}
                    <div className="lg:col-span-5 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-700">
                            <Sparkles className="size-3.5" />
                            <span>Professional Profile Engine</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight">
                            Build Standout <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">Resumes</span> with <span className="text-indigo-600">SMART</span> AI.
                        </h1>

                        <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Draft, refine, and download customized curriculum vitae using stateful token validation, client-side PDF processing, and optimized layout matrices.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                            <Link to='/app' className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3.5 flex items-center justify-center font-bold text-sm transition-all duration-200 active:scale-95 shadow-md shadow-indigo-150 cursor-pointer">
                                Get Started Free
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 size-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </Link>
                        </div>

                        <div className="space-y-2.5 pt-4 text-xs font-semibold text-slate-600">
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <CheckCircle className="size-4 text-indigo-600" />
                                <span>Free dynamic templates included</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <CheckCircle className="size-4 text-indigo-600" />
                                <span>Optimized keywords mapping</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Product Mockup in HTML/CSS */}
                    <div className="lg:col-span-7 flex justify-center">
                        <div className="w-full max-w-[540px] bg-slate-900 rounded-3xl p-4 shadow-2xl shadow-indigo-900/10 border border-slate-800 relative overflow-hidden group">
                            
                            {/* Card Header Toolbar Mock */}
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                                <div className="flex gap-1.5 pl-2">
                                    <span className="size-3 bg-red-500 rounded-full" />
                                    <span className="size-3 bg-amber-500 rounded-full" />
                                    <span className="size-3 bg-green-500 rounded-full" />
                                </div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-lg">
                                    SMART Workspace Mockup
                                </div>
                                <div className="size-3 w-8" />
                            </div>

                            {/* Two Column Mockup Content */}
                            <div className="grid grid-cols-12 gap-4">
                                {/* Left Mockup Panel - Fields */}
                                <div className="col-span-5 bg-slate-800/50 rounded-xl p-3.5 border border-slate-800/80 space-y-3">
                                    <div className="h-2 w-16 bg-slate-700 rounded-md" />
                                    <div className="h-5 w-full bg-slate-800 rounded-md border border-slate-700" />
                                    
                                    <div className="h-2 w-10 bg-slate-700 rounded-md pt-2" />
                                    <div className="h-14 w-full bg-slate-800 rounded-md border border-slate-700 p-2 flex flex-col justify-between">
                                        <div className="space-y-1">
                                            <div className="h-1.5 w-full bg-slate-600 rounded-xs" />
                                            <div className="h-1.5 w-4/5 bg-slate-600 rounded-xs" />
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="px-1.5 py-0.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-[7px] font-bold uppercase rounded flex items-center gap-0.5">
                                                <Wand2 className="size-2" /> Enhance
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-6 w-full bg-indigo-600 text-white rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm">
                                        Save Progress
                                    </div>
                                </div>

                                {/* Right Mockup Panel - Live sheet render */}
                                <div className="col-span-7 bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3.5">
                                    {/* Resume preview Header */}
                                    <div className="border-b border-slate-100 pb-2">
                                        <div className="h-3.5 w-24 bg-slate-800 rounded-sm" />
                                        <div className="h-1.5 w-16 bg-indigo-600 rounded-xs mt-1" />
                                    </div>
                                    
                                    {/* Resume Sections */}
                                    <div className="space-y-2">
                                        <div className="h-2 w-12 bg-indigo-600/20 rounded-xs" />
                                        <div className="space-y-1.5">
                                            <div className="h-1.5 w-full bg-slate-200 rounded-xs" />
                                            <div className="h-1.5 w-full bg-slate-200 rounded-xs" />
                                            <div className="h-1.5 w-2/3 bg-slate-200 rounded-xs" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <div className="h-2 w-16 bg-indigo-600/20 rounded-xs" />
                                        <div className="flex justify-between items-center">
                                            <div className="h-2 w-20 bg-slate-800 rounded-xs" />
                                            <div className="h-1.5 w-10 bg-slate-300 rounded-xs" />
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 rounded-xs" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Accent Glows inside mockup container */}
                            <div className="absolute -bottom-8 -right-8 size-28 bg-indigo-600 blur-[40px] opacity-20 pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

                    * {
                        font-family: 'Outfit', sans-serif;
                    }
                `}
            </style>
        </>
    )
}

export default Hero