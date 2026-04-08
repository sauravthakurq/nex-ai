import React from 'react';

export function HomeBackground() {
  return (
    <>
      <style>{`
        @keyframes floatCore {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(8vw, -10vh, 0) scale(1.25, 0.85); }
          66% { transform: translate3d(-8vw, 8vh, 0) scale(0.85, 1.15); }
        }
        @keyframes floatTeal {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          33% { transform: translate3d(-10vw, -15vh, 0) scale(1.2, 0.9) rotate(15deg); }
          66% { transform: translate3d(8vw, 5vh, 0) scale(0.9, 1.2) rotate(-10deg); }
        }
        @keyframes floatSky {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(-35deg); }
          33% { transform: translate3d(12vw, -20vh, 0) scale(1.3, 0.7) rotate(-55deg); }
          66% { transform: translate3d(-6vw, -5vh, 0) scale(0.8, 1.2) rotate(-15deg); }
        }
        @keyframes floatOrange {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(10vw, -12vh, 0) scale(1.2, 0.8); }
          66% { transform: translate3d(-8vw, 6vh, 0) scale(0.8, 1.1); }
        }

        .animate-core { animation: floatCore 8s ease-in-out infinite; will-change: transform; }
        .animate-teal { animation: floatTeal 10s ease-in-out infinite; will-change: transform; }
        .animate-sky { animation: floatSky 9s ease-in-out infinite; will-change: transform; }
        .animate-orange { animation: floatOrange 11s ease-in-out infinite; will-change: transform; }

        .hardware-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>

      <div className="fixed inset-0 w-[100vw] h-[100vh] -z-10 pointer-events-none overflow-hidden bg-[#030916] hardware-accelerated">
        {/* Removed expensive SVG turbulence. Keeps background clean and performant. */}
        <div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.03] bg-[url('/noise.png')] bg-repeat"
          style={{ backgroundSize: '128px 128px' }}
        ></div>

        {/* Removed expensive CSS filter: blur(120px) which completely crashes scroll. The radial-gradient is natively soft */}
        <div className="absolute inset-0 z-0 hardware-accelerated saturate-150">
          <div
            className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[80vh] rounded-full opacity-60 animate-teal"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.4) 0%, rgba(202, 138, 4, 0.2) 50%, transparent 80%)',
              mixBlendMode: 'screen',
            }}
          />

          <div
            className="absolute top-[25%] left-[5%] w-[80vw] h-[80vh] rounded-full opacity-70 animate-core"
            style={{
              background:
                'radial-gradient(circle at center, rgba(254, 240, 138, 0.4) 0%, rgba(249, 115, 22, 0.3) 30%, rgba(159, 18, 57, 0.1) 60%, transparent 80%)',
              mixBlendMode: 'screen',
            }}
          />

          <div
            className="absolute top-[10%] right-[0%] w-[70vw] h-[70vh] rounded-full opacity-60 animate-sky"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.3) 0%, rgba(8, 145, 178, 0.15) 50%, transparent 80%)',
              mixBlendMode: 'screen',
            }}
          />

          <div
            className="absolute -bottom-[10%] right-[0%] w-[60vw] h-[60vh] rounded-full opacity-60 animate-orange"
            style={{
              background:
                'radial-gradient(circle at center, rgba(234, 88, 12, 0.3) 0%, rgba(190, 18, 60, 0.15) 50%, transparent 80%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>
    </>
  );
}
