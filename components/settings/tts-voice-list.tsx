import { useMemo } from 'react';
import { useSettingsStore } from '@/lib/store/settings';
import { getTTSVoices } from '@/lib/audio/constants';
import { useI18n } from '@/lib/hooks/use-i18n';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTTSPreview } from '@/lib/audio/use-tts-preview';
import azureVoicesData from '@/lib/audio/azure.json';

function getVoiceDisplayName(name: string, _lang: string): string {
  if (true) {
    const match = name.match(/\(([^)]+)\)/);
    return match ? match[1] : name;
  }
  return name;
}

export function TTSVoiceList() {
  const { t, locale } = useI18n();
  const ttsProviderId = useSettingsStore((s) => s.ttsProviderId);
  const ttsVoice = useSettingsStore((s) => s.ttsVoice);
  const setTTSVoice = useSettingsStore((s) => s.setTTSVoice);
  const ttsProvidersConfig = useSettingsStore((s) => s.ttsProvidersConfig);
  const ttsSpeed = useSettingsStore((s) => s.ttsSpeed);

  const { previewing, startPreview, stopPreview } = useTTSPreview();

  const voices = useMemo(() => {
    if (ttsProviderId === 'azure-tts') {
      return azureVoicesData.voices.map((v) => ({
        id: v.ShortName,
        name: v.LocalName,
        language: v.Locale,
      }));
    }
    return getTTSVoices(ttsProviderId);
  }, [ttsProviderId]);

  const localizedVoices = useMemo(() => {
    return voices.map((v) => ({
      ...v,
      displayName: getVoiceDisplayName(v.name, locale),
    }));
  }, [voices, locale]);

  const handlePreview = async (voiceId: string) => {
    if (previewing) {
      stopPreview();
    }
    const providerConfig = ttsProvidersConfig[ttsProviderId];
    try {
      await startPreview({
        text: 'Hello, this is a voice preview. Testing, testing, 1, 2, 3.',
        providerId: ttsProviderId,
        modelId: providerConfig?.modelId,
        voice: voiceId,
        speed: ttsSpeed,
        apiKey: providerConfig?.apiKey,
        baseUrl: providerConfig?.baseUrl,
      });
    } catch (e) {
      console.error('Preview failed', e);
    }
  };

  if (voices.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-border/40">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {t('settings.availableVoices') || 'Available Voices'}
        </h3>
        <p className="text-xs text-muted-foreground">{localizedVoices.length} voices</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 pb-2">
        {localizedVoices.map((v) => {
          const isSelected = ttsVoice === v.id;
          return (
            <div
              key={v.id}
              onClick={() => setTTSVoice(v.id)}
              className={cn(
                'relative flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group',
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                  : 'border-border hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10',
              )}
            >
              <div className="flex flex-col gap-1 pr-10">
                <span
                  className={cn(
                    'text-sm font-medium leading-none',
                    isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground',
                  )}
                >
                  {v.displayName || v.name}
                </span>
                {v.language && (
                  <span className="text-xs text-muted-foreground mt-1">{v.language}</span>
                )}
              </div>

              <div className="absolute right-3 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(v.id);
                  }}
                  className="p-1.5 rounded-full bg-background/50 hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 border border-transparent shadow-sm hover:shadow"
                  title="Preview Voice"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
