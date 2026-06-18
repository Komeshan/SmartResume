import React from 'react'

const Logo = ({ className = 'h-9' }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* SVG Icon */}
      <svg className="h-full w-auto text-indigo-600" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="26" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M9 11H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="19" r="2.5" fill="currentColor" />
      </svg>
      {/* Brand Text */}
      <span className="font-extrabold text-lg tracking-tight text-slate-800 uppercase">
        SMART<span className="text-indigo-600 font-medium lowercase">.resume</span>
      </span>
    </div>
  )
}

export default Logo
