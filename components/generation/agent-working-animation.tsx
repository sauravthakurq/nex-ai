import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/hooks/use-i18n';

const messages = [
  "Waking up 4 AI Agents...",
  "Prof. Maya claimed → Topic Analysis",
  "Dr. Aryan claimed → Slide Design",
  "Alex claimed → Quiz Generation",
  "Luna claimed → Voice Narration",
  "All 4 agents running in parallel...",
  "Prof. Maya handed outline to Dr. Aryan...",
  "Alex & Luna are collaborating on Scene 2...",
  "Dr. Aryan pushed 6 slides to the board...",
  "Agents syncing outputs with each other...",
  "4 of 4 agents completed their tasks...",
  "Merging everything into one classroom...",
  "🎓 Your classroom is almost ready..."
];

const themes = [
  { primary: "#ffffff", secondary: "#cfcfcf" }, // White / Light Grey
  { primary: "#9ca3af", secondary: "#4b5563" }, // Grey / Dark Grey
  { primary: "#111111", secondary: "#404040" }, // Black / Dark Grey
];

interface AgentWorkingAnimationProps {
  onViewAgents?: () => void;
  showButton?: boolean;
}

export function AgentWorkingAnimation({ onViewAgents, showButton = true }: AgentWorkingAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // 3 seconds matches the CSS animation duration

    return () => clearInterval(interval);
  }, []);

  const currentTheme = themes[currentIndex % themes.length];

  return (
    <div className="relative font-sans overflow-hidden py-2" style={{ zIndex: 10 }}>
      {/* Global Styles for Animations */}
      <style>{`
        @keyframes shineMulti {
            to { background-position: 200% center; }
        }
        @keyframes animWipeRight {
            0% { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-10px); }
            15% { opacity: 1; clip-path: inset(0 0 0 0); transform: translateX(0); }
            85% { opacity: 1; clip-path: inset(0 0 0 0); transform: translateX(0); }
            100% { opacity: 0; clip-path: inset(0 0 0 100%); transform: translateX(10px); }
        }
      `}</style>

      {/* Main Content Layout */}
      <div className="relative flex items-center justify-center gap-6">
        {/* Text Container */}
        <div className="w-[420px] flex items-center justify-center overflow-hidden h-[40px] max-w-full">
            <span 
              key={currentIndex} 
              className="inline-block whitespace-nowrap text-[16px] font-medium tracking-wide text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(90deg, #9ca3af 0%, ${currentTheme.primary} 25%, #ffffff 50%, ${currentTheme.secondary} 75%, #9ca3af 100%)`,
                backgroundSize: '200% auto',
                animation: 'shineMulti 3s linear infinite, animWipeRight 3s cubic-bezier(0.22, 1, 0.36, 1) forwards'
              }}
            >
                {messages[currentIndex]}
            </span>
        </div>

        {/* Right Button: Agent Roles Pill */}
        {showButton && (
        <button 
          onClick={onViewAgents}
          className="relative group rounded-full p-[1px] overflow-hidden focus:outline-none"
        >
            {/* Animated spinning conic gradient border */}
            <div 
              className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `conic-gradient(from 90deg at 50% 50%, ${currentTheme.primary} 0%, ${currentTheme.secondary} 50%, ${currentTheme.primary} 100%)`
              }}
            ></div>
            
            {/* Button Body */}
            <div className="relative flex items-center gap-2 bg-[#080808] px-6 py-2.5 rounded-full transition-all group-hover:bg-black/60 backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-colors duration-1000" style={{ color: currentTheme.primary }}>
                    <rect x="16" y="16" width="6" height="6" rx="1"></rect>
                    <rect x="2" y="16" width="6" height="6" rx="1"></rect>
                    <rect x="9" y="2" width="6" height="6" rx="1"></rect>
                    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
                    <path d="M12 12V8"></path>
                </svg>
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-white group-hover:to-white transition-colors">
                    {t('generation.viewAgents')}
                </span>
            </div>
        </button>
        )}
      </div>
    </div>
  );
}
