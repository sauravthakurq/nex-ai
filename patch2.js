const fs = require('fs');
const file = 'components/roundtable/index.tsx';
let code = fs.readFileSync(file, 'utf8');

const s1 = `        {/* Left: Teacher identity */}`;
const s2 = `        {/* Center: Interaction stage */}`;
if (code.indexOf(s1) !== -1 && code.indexOf(s2) !== -1) {
  code = code.slice(0, code.indexOf(s1)) + code.slice(code.indexOf(s2));
}

const c1 = `          <div
            onClick={() => {
              if (isInputOpen || isVoiceOpen) {
                setIsInputOpen(false);
                setIsVoiceOpen(false);
                if (isRecording || isProcessing) cancelRecording();
              }
            }}
            className="relative w-full h-full rounded-[2.5rem] bg-gradient-to-b from-white/40 to-white/80 dark:from-gray-800/40 dark:to-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col justify-center px-6 overflow-hidden group transition-all duration-150 cursor-default"
          >`;

const c2 = `          <div
            onClick={() => {
              if (isInputOpen || isVoiceOpen) {
                setIsInputOpen(false);
                setIsVoiceOpen(false);
                if (isRecording || isProcessing) cancelRecording();
              }
            }}
            className="relative w-full h-full rounded-[2.5rem] bg-gradient-to-b from-white/40 to-white/80 dark:from-gray-800/40 dark:to-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex-1 flex flex-col justify-end overflow-y-auto px-6 group transition-all duration-150 cursor-default scrollbar-hide pb-6 pt-6"
          >
            {/* Compact Floating Pill for Professor Identity */}
            <div className="shrink-0 flex self-start mb-4 z-40 sticky top-0">
              <div
                ref={teacherAvatarRef}
                className="relative group cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <HoverCard openDelay={300} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-2 py-1 rounded-full border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all hover:bg-white/80 dark:hover:bg-gray-800/80">
                      <div
                        className={cn(
                          'relative w-6 h-6 rounded-full transition-all duration-150 flex items-center justify-center',
                          activeRole === 'teacher' ? 'scale-105' : 'opacity-90 scale-95',
                        )}
                      >
                        <div
                          className={cn(
                            'absolute inset-0 rounded-full border transition-all duration-150',
                            activeRole === 'teacher'
                              ? 'border-gray-500 dark:border-gray-400 shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                              : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-black',
                          )}
                        />
                        <div className="w-5 h-5 shrink-0 rounded-full bg-white dark:bg-gray-800 overflow-hidden relative z-10 shadow-sm border border-gray-50 dark:border-gray-700">
                          <img
                            src={teacherAvatar}
                            alt={teacherName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {activeRole === 'teacher' && (
                          <div className="absolute -right-0.5 top-0 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full border border-white dark:border-gray-800 flex items-center justify-center z-20">
                            <div className="w-[3px] h-[3px] bg-white rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>

                      <span
                        className={cn(
                          'max-w-[100px] truncate pr-1 text-[11px] font-bold tracking-wide transition-all duration-150',
                          activeRole === 'teacher' && !speakingStudent
                            ? 'text-gray-900 dark:text-gray-200'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300',
                        )}
                      >
                        {teacherName}
                      </span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side="bottom" align="start" className="w-64 p-3 max-h-[300px] overflow-y-auto">
                    {(() => {
                      const teacherConfig = getAgentConfig(teacherParticipant?.id || '');
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                              <img src={teacherAvatar} alt={teacherName} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{teacherName}</p>
                              <span
                                className="inline-block text-[10px] leading-tight px-1.5 py-0.5 rounded-full text-white mt-0.5"
                                style={{ backgroundColor: teacherConfig?.color || '#8b5cf6' }}
                              >
                                {t('settings.agentRoles.teacher')}
                              </span>
                            </div>
                          </div>
                          {teacherConfig?.persona && (
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
                              {teacherConfig.persona}
                            </p>
                          )}
                        </>
                      );
                    })()}
                  </HoverCardContent>
                </HoverCard>

                {/* ProactiveCard from teacher avatar */}
                <AnimatePresence>
                  {discussionRequest && discussionRequest.agentId === teacherParticipant?.id && (
                    <ProactiveCard
                      action={discussionRequest}
                      mode={engineMode === 'paused' ? 'paused' : 'playback'}
                      anchorRef={teacherAvatarRef}
                      align="left"
                      agentName={teacherName}
                      agentAvatar={teacherAvatar}
                      agentColor={getAgentConfig(teacherParticipant?.id || '')?.color}
                      onSkip={() => onDiscussionSkip?.()}
                      onListen={() => onDiscussionStart?.(discussionRequest)}
                      onTogglePause={() => onPlayPause?.()}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>`;

code = code.replace(c1, c2);
fs.writeFileSync(file, code, 'utf8');
console.log('Update complete!');
