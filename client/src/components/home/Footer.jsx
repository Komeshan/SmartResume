import React from 'react'

const Footer = () => {
  return (
    <footer id='contact' className="w-full bg-gradient-to-b from-[#fcfdfd] to-[#1542cf] text-gray-800">

      {/* Logo + tagline */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src="/SMART.svg"
            alt="SMART Logo"
            className="h-11"
          />
        </div>

        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          A help in hand for the future.
        </p>
      </div>

            {/* Contact section */}
        <div className="max-w-6xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">

        {/* Address */}
        <div className="flex items-start  gap-2.5 max-w-xs">
            <div className="size-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 8.335c0 4.16-4.616 8.494-6.166 9.832a.83.83 0 0 1-1.002 0c-1.55-1.338-6.166-5.672-6.166-9.832a6.667 6.667 0 0 1 13.334 0" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 8.335 9.167 10 12.5 6.668" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <div>
            <h4 className="text-base font-medium text-zinc-800 mb-0.5">
                Address
            </h4>
            <p className="text-sm text-white leading-relaxed">
                548 Park Street Mews, Colombo - 07 <br />
                Sri Lanka
            </p>
            </div>
        </div>

        {/* Phone */}
        <div className="flex items-start pl-20 gap-2.5 max-w-xs">
            <div className="size-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M10.95 13.115a.79.79 0 0 0 .96-.24l.282-.368a1.58 1.58 0 0 1 1.266-.633h2.375a1.583 1.583 0 0 1 1.584 1.583v2.375a1.583 1.583 0 0 1-1.584 1.583 14.25 14.25 0 0 1-14.25-14.25 1.583 1.583 0 0 1 1.584-1.583h2.375a1.583 1.583 0 0 1 1.583 1.583V5.54a1.58 1.58 0 0 1-.633 1.267l-.37.278a.79.79 0 0 0-.232.976 11.1 11.1 0 0 0 5.06 5.054" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <div>
            <h4 className="text-base font-medium text-zinc-800 mb-0.5">
                Phone
            </h4>
            <p className="text-sm text-white leading-relaxed">
                +94 (76) 123 4567
            </p>
            </div>
        </div>

        {/* Email */}
        <div className="flex items-start pl-20 gap-2.5 max-w-xs">
            <div className="size-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="m18.333 5.832-7.492 4.773a1.67 1.67 0 0 1-1.674 0l-7.5-4.773" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.667 3.332H3.333c-.92 0-1.666.746-1.666 1.667v10c0 .92.746 1.666 1.666 1.666h13.334c.92 0 1.666-.746 1.666-1.666v-10c0-.92-.746-1.667-1.666-1.667" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <div>
            <h4 className="text-base font-medium text-zinc-800 mb-0.5">
                Email
            </h4>
            <p className="text-sm text-white leading-relaxed">
                contact@smartresume.com
            </p>
            </div>
        </div>

        </div>

            {/* Bottom copyright */}
            <div className="border-t border-slate-200">
                <div className="text-white max-w-7xl mx-auto px-6 py-6 text-center text-sm">
                <a href="/">SMART Resume</a> ©2026. All rights reserved.
                </div>
            </div>

    </footer>
  )
}

export default Footer