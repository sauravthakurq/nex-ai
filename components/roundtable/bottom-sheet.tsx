'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface BottomSheetProps {
  children?: React.ReactNode;
  visible?: boolean;
}

export function BottomSheet({ children, visible = true }: BottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelHeight, setPanelHeight] = useState(120);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = panelHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = startY - moveEvent.clientY;
      let newHeight = startHeight + delta;

      if (newHeight < 60) newHeight = 60;
      if (newHeight > window.innerHeight * 0.85) newHeight = window.innerHeight * 0.85;

      setPanelHeight(newHeight);
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  const handlePillClick = () => {
    setIsExpanded(true);
  };

  return (
    <>
      {/* Dim Overlay for Mobile */}
      <AnimatePresence>
        {visible && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black z-30 transition-opacity md:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Floating Ask AI Pill */}
      <AnimatePresence>
        {visible && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 z-50 left-1/2 -translate-x-1/2"
          >
            <button
              onClick={handlePillClick}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0rgba(0,0,0,0.5)] hover:bg-white/90 dark:hover:bg-black/80 transition-all active:scale-95 outline-none"
            >
              <Sparkles className="w-4 h-4 text-gray-800 dark:text-gray-200" />
              <span className="font-medium text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                Ask AI
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resizable Inline Panel */}
      <AnimatePresence>
        {visible && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: panelHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full z-40 shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl border-t border-white/60 dark:border-white/10 shadow-[0_-10px_40px_0rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_0rgba(0,0,0,0.3)] rounded-t-[2rem] flex flex-col overflow-hidden"
          >
            {/* Drag Handle to Resize */}
            <div
              onPointerDown={startResize}
              className="w-full flex justify-center py-4 cursor-ns-resize shrink-0 touch-none z-10 hover:bg-gray-500/5 active:bg-gray-500/10 transition-colors"
            >
              <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-500/50 rounded-full" />
            </div>

            {/* Inner Content (Chatbar + everything else provided in children) */}
            <div className="flex-1 w-full h-full flex flex-col px-4 pb-8 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
