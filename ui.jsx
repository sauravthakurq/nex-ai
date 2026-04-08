import React, { useState } from 'react';
import {
  User,
  ChevronDown,
  Shuffle,
  Volume2,
  BrainCircuit,
  Paperclip,
  Globe,
  SlidersHorizontal,
  Mic,
  ArrowUp,
  Command,
  Sparkles,
  Pen,
} from 'lucide-react';

export default function App() {
  const [inputText, setInputText] = useState('');

  return (
    // Apple-style ultra-premium container
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex items-center justify-center p-3 sm:p-8 font-sans antialiased selection:bg-gray-300 dark:selection:bg-gray-700 relative overflow-hidden transition-colors duration-500">
      {/* Background ambient glows - Keeps it feeling premium without affecting the solid card */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-white/40 dark:bg-white/[0.01] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-slate-200/30 dark:bg-blue-900/[0.02] rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />

      {/* Main Input Card - Solid White & Pure Dark (No Blur) */}
      <div
        className="w-full max-w-[800px] bg-white dark:bg-[#121212] rounded-[28px] sm:rounded-[36px] 
                   shadow-[0_4px_20px_rgba(0,0,0,0.04),0_16px_40px_rgba(0,0,0,0.04)] 
                   dark:shadow-[0_4px_24px_rgba(0,0,0,0.4),0_16px_56px_rgba(0,0,0,0.6)]
                   transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
                   focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.06),0_24px_80px_rgba(0,0,0,0.08)] 
                   dark:focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_24px_80px_rgba(0,0,0,0.8)]
                   focus-within:-translate-y-1
                   border border-gray-200/60 dark:border-white/10 relative z-10"
      >
        {/* TOP BAR - User and Teacher profiles (Mobile Optimized Stacking) */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          {/* Left: User Profile Pill */}
          <button className="flex items-center justify-between sm:justify-start gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-gray-50 dark:bg-[#1e1e1e] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] border border-gray-200/50 dark:border-white/5 shadow-sm transition-all duration-300 group cursor-pointer active:scale-[0.98] w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                {/* --- USER IMAGE PLACEHOLDER START --- */}
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#2c2c2e] flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm group-hover:shadow transition-shadow">
                  <User strokeWidth={1.5} className="w-4 h-4 text-black dark:text-white" />
                </div>
                {/* --- USER IMAGE PLACEHOLDER END --- */}

                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white dark:bg-[#2c2c2e] shadow-sm border border-gray-200 dark:border-[#3a3a3c] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <Pen strokeWidth={2} className="w-2 h-2 text-black dark:text-white" />
                </div>
              </div>
              <span className="font-semibold text-[14px] text-black dark:text-white tracking-tight">
                Hi, Learner
              </span>
            </div>
            <ChevronDown strokeWidth={1.5} className="w-4 h-4 text-black dark:text-white sm:ml-1" />
          </button>

          {/* Right: Teacher Context Pill */}
          <button className="flex items-center justify-between sm:justify-start gap-3 pl-4 pr-2.5 py-1.5 rounded-full bg-gray-50 dark:bg-[#1e1e1e] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] border border-gray-200/50 dark:border-white/5 shadow-sm transition-all duration-300 group w-full sm:w-auto active:scale-[0.98]">
            <span className="text-[13.5px] font-medium text-black dark:text-white tracking-tight">
              Ready to learn together?
            </span>

            <div className="flex items-center gap-2 shrink-0 bg-white dark:bg-[#2c2c2e] p-1 pl-2 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
              {/* --- TEACHER/ASSISTANT IMAGES PLACEHOLDER START --- */}
              <div className="flex -space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-[#3a3a3c] border-[1.5px] border-white dark:border-[#1e1e1e] flex items-center justify-center z-10 overflow-hidden shadow-sm">
                  <Command strokeWidth={1.5} className="w-3.5 h-3.5 text-black dark:text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#48484a] border-[1.5px] border-white dark:border-[#1e1e1e] flex items-center justify-center z-0 overflow-hidden shadow-sm">
                  <Sparkles strokeWidth={1.5} className="w-3 h-3 text-black dark:text-white" />
                </div>
              </div>
              {/* --- TEACHER/ASSISTANT IMAGES PLACEHOLDER END --- */}

              <div className="flex items-center gap-1.5 px-1.5">
                <Shuffle strokeWidth={1.5} className="w-3.5 h-3.5 text-black dark:text-white" />
                <Volume2 strokeWidth={1.5} className="w-3.5 h-3.5 text-black dark:text-white" />
              </div>
            </div>
          </button>
        </div>

        {/* TEXT AREA */}
        <div className="px-5 sm:px-7 py-4 sm:py-5">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='What do you want to learn today? e.g.&#10;"Explain quantum physics simply"&#10;"Teach me Python from scratch"'
            className="w-full resize-none border-0 bg-transparent text-[16px] sm:text-[17px] leading-[1.6] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-black dark:text-white focus:outline-none min-h-[100px] sm:min-h-[140px] tracking-normal"
          />
        </div>

        {/* BOTTOM TOOLBAR (Mobile Optimized Layout) */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 sm:gap-5">
          {/* Left Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* AI Model Setup button */}
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 rounded-full bg-gray-50 dark:bg-[#1e1e1e] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] border border-gray-200/50 dark:border-white/5 shadow-sm text-black dark:text-white text-[14px] sm:text-[13.5px] font-medium transition-all duration-300 active:scale-[0.97] w-full sm:w-auto">
              <BrainCircuit strokeWidth={1.5} className="w-4 h-4 text-black dark:text-white" />
              Choose AI model
            </button>

            <div className="hidden sm:block w-[1px] h-6 bg-gray-200 dark:bg-[#333] rounded-full mx-1"></div>

            {/* Grouped utility icons */}
            <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#1e1e1e] p-1.5 rounded-full border border-gray-200/50 dark:border-white/5 shadow-sm w-full sm:w-auto">
              <ToolbarButton icon={<Paperclip strokeWidth={1.5} className="w-4 h-4" />} />
              <ToolbarButton icon={<Globe strokeWidth={1.5} className="w-4 h-4" />} disabled />

              {/* Prominent settings button */}
              <button className="flex-1 sm:flex-none w-auto sm:w-9 h-9 flex items-center justify-center rounded-full bg-[#1d1d1f] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black transition-all duration-300 active:scale-[0.94] shadow-md ml-0.5 px-6 sm:px-0">
                <SlidersHorizontal strokeWidth={1.5} className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
            <button className="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200/50 dark:border-white/5 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all duration-300 active:scale-[0.96] shadow-sm shrink-0">
              <Mic strokeWidth={1.5} className="w-[18px] h-[18px]" />
            </button>

            <button
              disabled={!inputText.trim()}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3 rounded-full text-[15px] sm:text-[15px] font-medium tracking-tight transition-all duration-500
                ${
                  inputText.trim()
                    ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md hover:bg-black dark:hover:bg-gray-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.97]'
                    : 'bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200/50 dark:border-white/5 text-gray-400 dark:text-[#555] cursor-not-allowed shadow-none'
                }`}
            >
              Enter Classroom
              <ArrowUp
                strokeWidth={2}
                className={`w-4 h-4 transition-all duration-300 ${inputText.trim() ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable micro-component for toolbar icon buttons
function ToolbarButton({ icon, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all duration-300
        ${
          disabled
            ? 'text-gray-400 dark:text-[#555] cursor-not-allowed bg-transparent'
            : 'bg-white dark:bg-[#2c2c2e] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#3a3a3c] shadow-sm border border-gray-200/50 dark:border-white/5 hover:shadow active:scale-[0.94]'
        }`}
    >
      {icon}
    </button>
  );
}
