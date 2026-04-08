'use client';

import { Button } from '@/components/ui/button';
import { Box, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { ProviderId, ProviderConfig } from '@/lib/ai/providers';

interface ProviderWithServerInfo extends ProviderConfig {
  isServerConfigured?: boolean;
}

interface ProviderListProps {
  providers: ProviderWithServerInfo[];
  selectedProviderId: ProviderId;
  onSelect: (providerId: ProviderId) => void;
  onAddProvider: () => void;
  width?: number;
}

export function ProviderList({
  providers,
  selectedProviderId,
  onSelect,
  onAddProvider,
  width,
}: ProviderListProps) {
  const { t } = useI18n();

  // Helper function to get translated provider name
  const getProviderDisplayName = (provider: ProviderConfig) => {
    const translationKey = `settings.providerNames.${provider.id}`;
    const translated = t(translationKey);
    // If translation exists (not equal to key), use it; otherwise fallback to provider.name
    return translated !== translationKey ? translated : provider.name;
  };

  return (
    <div
      className="flex-shrink-0 bg-background flex max-md:flex-row md:flex-col max-md:!w-full max-md:border-b border-border max-md:overflow-x-auto"
      style={{ width: width ?? 192 }}
    >
      <div className="flex flex-row md:flex-col flex-1 max-md:overflow-x-auto md:overflow-y-auto p-2 md:p-3 gap-2 md:gap-0 md:space-y-1.5 min-w-max md:min-w-0">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSelect(provider.id)}
            className={cn(
              'w-full max-md:w-max flex flex-shrink-0 items-center justify-center md:justify-start gap-2 md:gap-2.5 px-3 py-2 md:py-2.5 rounded-lg transition-all border text-left',
              selectedProviderId === provider.id
                ? 'bg-primary/5 border-primary/50 shadow-sm'
                : 'border-transparent hover:bg-muted/50',
            )}
          >
            {provider.icon ? (
              <img
                src={provider.icon}
                alt={getProviderDisplayName(provider)}
                className="w-5 h-5 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <Box className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="font-medium text-sm flex-1 truncate">
              {getProviderDisplayName(provider)}
            </span>
            {provider.isServerConfigured && (
              <span className="text-[10px] px-1 py-0 h-4 leading-4 rounded shrink-0 bg-muted text-muted-foreground">
                {t('settings.serverConfigured')}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Add Provider Button */}
      <div className="p-2 md:p-3 border-l md:border-l-0 md:border-t flex-shrink-0 flex items-center justify-center">
        <Button
          variant="outline"
          size="sm"
          className="w-full md:w-full max-md:w-max min-w-max gap-1.5"
          onClick={onAddProvider}
        >
          <Plus className="h-3.5 w-3.5" />
          {t('settings.addProviderButton')}
        </Button>
      </div>
    </div>
  );
}
