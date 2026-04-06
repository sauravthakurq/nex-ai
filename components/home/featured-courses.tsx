import React from 'react';

export function FeaturedCourses() {
  return (
    <div className="w-full flex justify-center text-white">
      <div className="w-[1200px] max-w-full space-y-8 flex flex-col justify-center mx-auto">
        {/* Top 2 Big Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-[1200px] max-w-full">
          {/* Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c2100a3f35fd14daa61fb898bff13ccbb4f41b9ee0b5045f418a3a9deb295?x-oss-process=image/resize,w_400,m_lfit"
                  className="w-full h-full object-cover object-top"
                  alt="Introduction to OpenClaw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-6 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium mb-2 bg-emerald-500/30 text-emerald-200">
                  CS
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight text-emerald-100">
                  Introduction to OpenClaw
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex items-center justify-between text-left">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="font-medium text-[15px] truncate text-white min-w-0">
                  Course Introduction: Mastering OpenClaw
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/40 text-[12px] truncate max-w-full">
                    Welcome to the World of Python!
                  </span>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-white"
                aria-label="More options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-more-horizontal"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c246da9786a424e8e1f582b1d7dcfc7c10b4528c70a84ce402ff7a4561b6c?x-oss-process=image/resize,w_800,m_lfit"
                  className="w-full h-full object-cover object-center"
                  alt="AIGC Content Strategy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-6 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium mb-2 bg-indigo-500/30 text-indigo-200">
                  AIGC
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight text-indigo-100">
                  AIGC Content Strategy
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex items-center justify-between text-left">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="font-medium text-[15px] truncate text-white min-w-0">
                  Future Content Ecology
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/40 text-[12px] truncate max-w-full">
                    AIGC Content System Introduction
                  </span>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-white"
                aria-label="More options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-more-horizontal"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom 4 Small Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 w-[1200px] max-w-full">
          {/* Small Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c2394541940984852d7e0d37e5d8b671cc32b57e7eb31d90c0f8628ded22f?x-oss-process=image/resize,w_800,m_lfit"
                  className="w-full h-full object-cover object-top"
                  alt="Quantum Physics"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 bg-blue-500/30 text-blue-200">
                  Physics
                </span>
                <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                  Quantum Physics Basics
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
              <span className="font-medium text-[14px] truncate text-white min-w-0">
                Quantum Theory
              </span>
              <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                From classical to quantum
              </span>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c1caba1be8b75497f48b0a9db4de2ee43ec7042a420b759fedde09f0293ee?x-oss-process=image/resize,w_800,m_lfit"
                  className="w-full h-full object-cover object-top"
                  alt="Modern Art"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 bg-rose-500/30 text-rose-200">
                  Art
                </span>
                <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                  Modern Art Space
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
              <span className="font-medium text-[14px] truncate text-white min-w-0">
                Digital Art Core
              </span>
              <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                Creative Expression Expression
              </span>
            </div>
          </div>

          {/* Small Card 3 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c1c9af591ad9142f7fc2cc5085d5def4598aadd6ddcc2a3d7c58edce76686?x-oss-process=image/resize,w_800,m_lfit"
                  className="w-full h-full object-cover object-top"
                  alt="Economics"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 bg-amber-500/30 text-amber-200">
                  Eco
                </span>
                <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                  Macro Economics
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
              <span className="font-medium text-[14px] truncate text-white min-w-0">
                Global Markets
              </span>
              <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                Understanding trends
              </span>
            </div>
          </div>

          {/* Small Card 4 */}
          <div className="group cursor-pointer">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
              <div className="absolute inset-0">
                <img
                  src="https://file.maic.chat/shares/media/013c242ef9e3db2b43b67035ce590130666fe482201ea18ea57bbd22ff1b072c?x-oss-process=image/resize,w_800,m_lfit"
                  className="w-full h-full object-cover object-top"
                  alt="Philosophy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 bg-purple-500/30 text-purple-200">
                  Phil
                </span>
                <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                  Ethics Today
                </h3>
              </div>
            </div>
            <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
              <span className="font-medium text-[14px] truncate text-white min-w-0">
                Moral Thinking
              </span>
              <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                Modern dilemmas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
