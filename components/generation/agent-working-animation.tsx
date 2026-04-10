import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/hooks/use-i18n';

const messages = [
  'Waking up 4 AI Agents...',
  'Prof. Maya claimed → Topic Analysis',
  'Dr. Aryan claimed → Slide Design',
  'Alex claimed → Quiz Generation',
  'Luna claimed → Voice Narration',
  'All agents are now running in parallel...',
  'Prof. Maya mapped the lesson structure...',
  'Dr. Aryan is designing visual slides...',
  'Alex is generating interactive quizzes...',
  'Luna is crafting voice narration...',
  'Agents are syncing outputs in real-time...',
  'Dr. Aryan pushed 6 slides to the board...',
  'Alex & Luna are collaborating on Scene 2...',
  'Saurav AI is building your classroom with AI agents…',
  '4 of 4 agents completed their tasks...',
  'Merging everything into one intelligent classroom...',
  '🎓 Your classroom is almost ready...',
];

const themes = [
  { primary: '#ffffff', secondary: '#cfcfcf' }, // White / Light Grey
  { primary: '#9ca3af', secondary: '#4b5563' }, // Grey / Dark Grey
  { primary: '#111111', secondary: '#404040' }, // Black / Dark Grey
];

interface AgentWorkingAnimationProps {
  onViewAgents?: () => void;
  showButton?: boolean;
}

export function AgentWorkingAnimation({
  onViewAgents,
  showButton = true,
}: AgentWorkingAnimationProps) {
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
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4">
        {/* Text Container */}
        <div className="w-full sm:w-[420px] flex items-center justify-center overflow-hidden h-[40px] px-2 sm:px-0">
          <span
            key={currentIndex}
            className="inline-block text-center whitespace-normal sm:whitespace-nowrap text-sm sm:text-[16px] font-medium tracking-wide text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #444 0%, #000 25%, #000 50%, #444 75%, #444 100%)',
              backgroundSize: '200% auto',
              animation:
                'shineMulti 3s linear infinite, animWipeRight 3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          >
            {messages[currentIndex]}
          </span>
        </div>

        {/* Right Button: Agent Roles Pill */}
        {showButton && (
          <button
            onClick={onViewAgents}
            className="flex items-center gap-1.5 sm:gap-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 backdrop-blur-xl border border-black/5 dark:border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm transition-all focus:outline-none active:scale-[0.98] shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/80"
            >
              <rect x="16" y="16" width="6" height="6" rx="1"></rect>
              <rect x="2" y="16" width="6" height="6" rx="1"></rect>
              <rect x="9" y="2" width="6" height="6" rx="1"></rect>
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
              <path d="M12 12V8"></path>
            </svg>
            <span className="text-xs sm:text-sm font-medium text-foreground">
              {t('generation.viewAgents')}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
