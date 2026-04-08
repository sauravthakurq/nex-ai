'use client';

import { Settings, Loader2, Download, FileDown, Package, PanelLeft } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { LanguageSwitcher } from './language-switcher';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SettingsDialog } from './settings';
import { cn } from '@/lib/utils';
import { useStageStore } from '@/lib/store/stage';
import { useMediaGenerationStore } from '@/lib/store/media-generation';
import { useExportPPTX } from '@/lib/export/use-export-pptx';
import { useSettingsStore } from '@/lib/store/settings';

import { LoginModal } from './login-modal';
import { useFirebaseAuth } from '@/lib/firebase/auth-hook';

interface HeaderProps {
  readonly currentSceneTitle: string;
}

export function Header({ currentSceneTitle }: HeaderProps) {
  const { t } = useI18n();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useFirebaseAuth();

  // Export
  const { exporting: isExporting, exportPPTX, exportResourcePack } = useExportPPTX();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const scenes = useStageStore((s) => s.scenes);
  const generatingOutlines = useStageStore((s) => s.generatingOutlines);
  const failedOutlines = useStageStore((s) => s.failedOutlines);
  const mediaTasks = useMediaGenerationStore((s) => s.tasks);

  const canExport =
    scenes.length > 0 &&
    generatingOutlines.length === 0 &&
    failedOutlines.length === 0 &&
    Object.values(mediaTasks).every((task) => task.status === 'done' || task.status === 'failed');

  const sidebarCollapsed = useSettingsStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useSettingsStore((s) => s.setSidebarCollapsed);

  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (themeOpen && themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
      if (exportMenuOpen && exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    },
    [themeOpen, exportMenuOpen],
  );

  useEffect(() => {
    if (themeOpen || exportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [themeOpen, exportMenuOpen, handleClickOutside]);

  return (
    <>
      <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between z-10 bg-transparent gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="shrink-0 relative rounded-md flex items-center justify-center transition-all duration-150 outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 w-9 h-9 text-foreground/60 dark:text-foreground/60 hover:text-foreground"
              title={t('common.toggleSidebar') || 'Toggle Sidebar'}
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex flex-col min-w-0 justify-center">
            <h1
              className="text-lg font-medium text-foreground tracking-tight truncate leading-tight"
              suppressHydrationWarning
            >
              {currentSceneTitle || t('common.loading')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Language Selector */}
          <LanguageSwitcher onOpen={() => setThemeOpen(false)} />

          {/* Login Button Button */}
          <div className="relative">
            <button
              onClick={() => setLoginOpen(true)}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center min-w-[80px]"
            >
              {user ? (
                <span className="truncate max-w-[100px]">{user.email?.split('@')[0]}</span>
              ) : (
                'Login'
              )}
            </button>
          </div>

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-1.5 rounded-full text-foreground hover:bg-transparent dark:hover:bg-transparent hover:text-foreground transition-all group active:scale-[0.95]"
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </div>

        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => {
              if (canExport && !isExporting) setExportMenuOpen(!exportMenuOpen);
            }}
            disabled={!canExport || isExporting}
            title={
              canExport
                ? isExporting
                  ? t('export.exporting')
                  : t('export.pptx')
                : t('share.notReady')
            }
            className={cn(
              'shrink-0 p-2.5 rounded-full transition-all ease-out active:scale-[0.95]',
              canExport && !isExporting
                ? 'text-foreground/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
                : 'text-foreground/20 cursor-not-allowed',
            )}
          >
            {isExporting ? (
              <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </button>
          {exportMenuOpen && (
            <div className="absolute top-full mt-2 right-0 glass border border-black/5 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 min-w-[240px] max-w-[calc(100vw-2rem)] p-1 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setExportMenuOpen(false);
                  exportPPTX();
                }}
                className="w-full px-3 py-2.5 text-left text-sm rounded-xl font-medium transition-all flex items-center gap-3 text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground active:scale-[0.98]"
              >
                <FileDown className="w-4 h-4 text-foreground/50 shrink-0" />
                <span>{t('export.pptx')}</span>
              </button>
              <button
                onClick={() => {
                  setExportMenuOpen(false);
                  exportResourcePack();
                }}
                className="w-full px-3 py-2.5 text-left text-sm rounded-xl font-medium transition-all flex items-start gap-3 mt-1 text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground active:scale-[0.98]"
              >
                <Package className="w-4 h-4 mt-0.5 text-foreground/50 shrink-0" />
                <div className="flex-1">
                  <div>{t('export.resourcePack')}</div>
                  <div className="text-[11px] text-foreground/50 mt-0.5 font-normal leading-tight">
                    {t('export.resourcePackDesc')}
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </header>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
