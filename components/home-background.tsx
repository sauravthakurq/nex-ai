import React from 'react';

export function HomeBackground() {
  return (
    <>
      <style>{`
        @keyframes floatCore {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(8vw, -10vh) scale(1.25, 0.85); }
          66% { transform: translate(-8vw, 8vh) scale(0.85, 1.15); }
        }
        @keyframes floatTeal {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-10vw, -15vh) scale(1.2, 0.9) rotate(15deg); }
          66% { transform: translate(8vw, 5vh) scale(0.9, 1.2) rotate(-10deg); }
        }
        @keyframes floatSky {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(-35deg); }
          33% { transform: translate(12vw, -20vh) scale(1.3, 0.7) rotate(-55deg); }
          66% { transform: translate(-6vw, -5vh) scale(0.8, 1.2) rotate(-15deg); }
        }
        @keyframes floatOrange {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, -12vh) scale(1.2, 0.8); }
          66% { transform: translate(-8vw, 6vh) scale(0.8, 1.1); }
        }

        .animate-core { animation: floatCore 8s ease-in-out infinite; }
        .animate-teal { animation: floatTeal 10s ease-in-out infinite; }
        .animate-sky { animation: floatSky 9s ease-in-out infinite; }
        .animate-orange { animation: floatOrange 11s ease-in-out infinite; }

        .blur-layer {
          filter: blur(120px) saturate(140%);
          transform: translateZ(0);
          will-change: filter;
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#030916] selection:bg-rose-500/30">
        
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="blur-layer absolute inset-0 z-0">
          
          <div 
            className="absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vh] rounded-[100%] opacity-70 animate-teal"
            style={{
              background: 'radial-gradient(ellipse at bottom left, #0d9488 0%, #ca8a04 70%, transparent 100%)',
              mixBlendMode: 'plus-lighter'
            }}
          />

          <div 
            className="absolute top-[35%] left-[10%] w-[65vw] h-[65vh] rounded-[100%] opacity-90 animate-core"
            style={{
              background: 'radial-gradient(circle at center, #fef08a 0%, #f97316 35%, #9f1239 70%, transparent 100%)',
              mixBlendMode: 'screen'
            }}
          />

          <div 
            className="absolute top-[20%] right-[5%] w-[40vw] h-[75vh] rounded-[100%] opacity-80 animate-sky"
            style={{
              background: 'radial-gradient(ellipse at center, #38bdf8 0%, #0891b2 50%, transparent 100%)',
              mixBlendMode: 'screen',
              transform: 'rotate(-35deg)'
            }}
          />

          <div 
            className="absolute -bottom-[20%] right-[-5%] w-[55vw] h-[55vh] rounded-[100%] opacity-70 animate-orange"
            style={{
              background: 'radial-gradient(circle at bottom right, #ea580c 0%, #be123c 60%, transparent 100%)',
              mixBlendMode: 'plus-lighter'
            }}
          />

        </div>
      </div>
    </>
  );
}
