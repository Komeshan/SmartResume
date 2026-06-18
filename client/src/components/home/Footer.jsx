import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const Footer = () => {
  return (
    <footer id='contact' className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">

      {/* Logo + tagline */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col items-center border-b border-slate-800">
        <div className="flex items-center space-x-3 mb-4">
          <Logo className="h-9 brightness-0 invert" />
        </div>

        <p className="text-center max-w-xl text-xs font-medium text-slate-500 leading-relaxed">
          SMART: Automated CV generation and optimization engine. Engineered for modern hiring pipelines.
        </p>
      </div>

      {/* Contact section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Address */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
            <div className="size-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M16.667 8.335c0 4.16-4.616 8.494-6.166 9.832a.83.83 0 0 1-1.002 0c-1.55-1.338-6.166-5.672-6.166-9.832a6.667 6.667 0 0 1 13.334 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 8.335 9.167 10 12.5 6.668" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                  Location
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                  548 Park Street Mews, Colombo - 07 <br />
                  Sri Lanka
              </p>
            </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
            <div className="size-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
              <svg width="17" height="17" viewBox="0 0 19 19" fill="none">
                  <path d="M10.95 13.115a.79.79 0 0 0 .96-.24l.282-.368a1.58 1.58 0 0 1 1.266-.633h2.375a1.583 1.583 0 0 1 1.584 1.583v2.375a1.583 1.583 0 0 1-1.584 1.583 14.25 14.25 0 0 1-14.25-14.25 1.583 1.583 0 0 1 1.584-1.583h2.375a1.583 1.583 0 0 1 1.583 1.583V5.54a1.58 1.58 0 0 1-.633 1.267l-.37.278a.79.79 0 0 0-.232.976 11.1 11.1 0 0 0 5.06 5.054" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                  Support Phone
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                  +94 (76) 123 4567
              </p>
            </div>
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
            <div className="size-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="m18.333 5.832-7.492 4.773a1.67 1.67 0 0 1-1.674 0l-7.5-4.773" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.667 3.332H3.333c-.92 0-1.666.746-1.666 1.667v10c0 .92.746 1.666 1.666 1.666h13.334c.92 0 1.666-.746 1.666-1.666v-10c0-.92-.746-1.667-1.666-1.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                  Email Contact
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                  support@smartresume.com
              </p>
            </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="border-t border-slate-800 bg-slate-950/45">
          <div className="text-slate-500 max-w-7xl mx-auto px-6 py-6 text-center text-xs">
            <Link to="/" className="hover:text-indigo-400 font-semibold transition">SMART Resume Workspace</Link> ©2026. All rights reserved.
          </div>
      </div>

    </footer>
  )
}

export default Footer