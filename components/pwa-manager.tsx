'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PwaContextType {
  isInstallable: boolean;
  showCustomPopup: () => void;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: true, // we set to true so the pill always shows, fallback handled inside popup
  showCustomPopup: () => {},
});

export const usePwa = () => useContext(PwaContext);

export function PwaProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if running on browser (window is defined)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    const handler = (e: Event) => {
      const installPromptEvent = e as BeforeInstallPromptEvent;
      installPromptEvent.preventDefault();
      setDeferredPrompt(installPromptEvent);
      setIsInstallable(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handler);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install: Tap the Share button (iOS) or browser menu, then 'Add to Home Screen'.");
      setShowPopup(false);
      setIsInstallable(false); // remove after clicking
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setShowPopup(false);
      setDeferredPrompt(null);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <PwaContext.Provider value={{ isInstallable, showCustomPopup: () => setShowPopup(true) }}>
      {children}

      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200 px-4"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 max-w-sm w-full relative overflow-hidden animate-in zoom-in-95 duration-300"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:bg-gray-100 transition-colors text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-[4/3] rounded-xl bg-gray-100 dark:bg-zinc-800 overflow-hidden mb-6 relative group">
              <img
                src="/k.jpeg"
                alt="Premium Look"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 ease-out"
              />
            </div>

            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Install SYNAPSE AI
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Add to your home screen for a seamless full-screen premium experience, faster
                launches, and offline access.
              </p>
            </div>

            <button
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-[15px] bg-[#111] text-white hover:bg-black hover:scale-[0.98] transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          </div>
        </div>
      )}
    </PwaContext.Provider>
  );
}
