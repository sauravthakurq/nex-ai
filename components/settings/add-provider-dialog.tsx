'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { cn } from '@/lib/utils';

export interface NewProviderData {
  name: string;
  type: 'openai' | 'anthropic' | 'google';
  baseUrl: string;
  icon: string;
  requiresApiKey: boolean;
  apiKey?: string;
  fallbackApiKeys?: string[];
}

interface AddProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (provider: NewProviderData) => void;
}

export function AddProviderDialog({ open, onOpenChange, onAdd }: AddProviderDialogProps) {
  const { t } = useI18n();

  // Internal state
  const [name, setName] = useState('');
  const [type, setType] = useState<'openai' | 'anthropic' | 'google'>('openai');
  const [baseUrl, setBaseUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [requiresApiKey, setRequiresApiKey] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [fallbackApiKeys, setFallbackApiKeys] = useState<string[]>([]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showFallbackApiKey, setShowFallbackApiKey] = useState<boolean[]>([]);

  // Reset form when dialog closes (derived state pattern)
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setName('');
      setType('openai');
      setBaseUrl('');
      setIcon('');
      setRequiresApiKey(true);
      setApiKey('');
      setFallbackApiKeys([]);
      setShowApiKey(false);
      setShowFallbackApiKey([]);
    }
  }

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleAdd = () => {
    onAdd({
      name,
      type,
      baseUrl,
      icon,
      requiresApiKey,
      apiKey,
      fallbackApiKeys,
    });
  };

  const addFallbackApiKey = () => {
    if (fallbackApiKeys.length < 7) {
      setFallbackApiKeys([...fallbackApiKeys, '']);
      setShowFallbackApiKey([...showFallbackApiKey, false]);
    }
  };

  const handleFallbackApiKeyChange = (index: number, key: string) => {
    const updated = [...fallbackApiKeys];
    updated[index] = key;
    setFallbackApiKeys(updated);
  };

  const removeFallbackApiKey = (index: number) => {
    const updated = fallbackApiKeys.filter((_, i) => i !== index);
    setFallbackApiKeys(updated);
    setShowFallbackApiKey(showFallbackApiKey.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogTitle className="sr-only">{t('settings.addProviderDialog')}</DialogTitle>
        <DialogDescription className="sr-only">
          {t('settings.addProviderDescription')}
        </DialogDescription>
        <div className="space-y-4">
          <div className="pb-3 border-b">
            <h2 className="text-lg font-semibold">{t('settings.addProviderDialog')}</h2>
          </div>

          {/* Provider Name */}
          <div className="space-y-2">
            <Label>{t('settings.providerName')}</Label>
            <Input
              placeholder={t('settings.providerNamePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              data-autocomplete="none"
            />
          </div>

          {/* API Mode */}
          <div className="space-y-2">
            <Label>{t('settings.providerApiMode')}</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setType('openai')}
                className={cn(
                  'p-2 rounded-lg border text-left text-sm transition-colors',
                  type === 'openai'
                    ? 'bg-primary/5 border-primary/50'
                    : 'hover:bg-muted/50 border-transparent',
                )}
              >
                {t('settings.apiModeOpenAI')}
              </button>
              <button
                onClick={() => setType('anthropic')}
                className={cn(
                  'p-2 rounded-lg border text-left text-sm transition-colors',
                  type === 'anthropic'
                    ? 'bg-primary/5 border-primary/50'
                    : 'hover:bg-muted/50 border-transparent',
                )}
              >
                {t('settings.apiModeAnthropic')}
              </button>
              <button
                onClick={() => setType('google')}
                className={cn(
                  'p-2 rounded-lg border text-left text-sm transition-colors',
                  type === 'google'
                    ? 'bg-primary/5 border-primary/50'
                    : 'hover:bg-muted/50 border-transparent',
                )}
              >
                {t('settings.apiModeGoogle')}
              </button>
            </div>
          </div>

          {/* Default Base URL */}
          <div className="space-y-2">
            <Label>{t('settings.defaultBaseUrl')}</Label>
            <Input
              type="url"
              placeholder="https://api.example.com/v1"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>

          {/* Icon URL */}
          <div className="space-y-2">
            <Label>{t('settings.providerIcon')}</Label>
            <Input
              type="url"
              placeholder="https://example.com/icon.svg"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>

          {/* Requires API Key */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="requires-api-key"
              checked={requiresApiKey}
              onCheckedChange={(checked) => {
                setRequiresApiKey(checked as boolean);
                if (!checked) {
                  setApiKey('');
                  setFallbackApiKeys([]);
                  setShowApiKey(false);
                  setShowFallbackApiKey([]);
                }
              }}
            />
            <label htmlFor="requires-api-key" className="text-sm cursor-pointer">
              {t('settings.requiresApiKey')}
            </label>
          </div>

          {/* API Key Inputs */}
          {requiresApiKey && (
            <div className="space-y-4 pt-2 -mt-2">
              <div className="space-y-2">
                <Label>{t('settings.providerApiKey', 'API Key')}</Label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <Input
                      name="new-provider-api-key"
                      type={showApiKey ? 'text' : 'password'}
                      autoComplete="new-password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      placeholder={t('settings.providerApiKeyPlaceholder', 'sk-...')}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="h-9 pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFallbackApiKey}
                    title="Add Fallback API Key (Limit 7)"
                    disabled={fallbackApiKeys.length >= 7}
                    className="gap-0 w-9 px-0 h-9"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {fallbackApiKeys.length > 0 && (
                <div className="space-y-2 pl-4 border-l-2 border-border/50">
                  <Label className="text-xs text-muted-foreground">Fallback API Keys</Label>
                  {fallbackApiKeys.map((fbKey, index) => (
                    <div key={`fallback-${index}`} className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <Input
                          name={`new-fallback-api-key-${index}`}
                          type={showFallbackApiKey[index] ? 'text' : 'password'}
                          autoComplete="new-password"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          placeholder={t('settings.providerApiKeyPlaceholder', 'sk-... (Fallback)')}
                          value={fbKey}
                          onChange={(e) => handleFallbackApiKeyChange(index, e.target.value)}
                          className="h-9 pr-8"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...showFallbackApiKey];
                            updated[index] = !updated[index];
                            setShowFallbackApiKey(updated);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showFallbackApiKey[index] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFallbackApiKey(index)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive w-9 px-0 h-9 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t">
            <Button variant="outline" size="sm" onClick={handleClose}>
              {t('settings.cancelEdit')}
            </Button>
            <Button size="sm" onClick={handleAdd} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              {t('settings.addProviderButton')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
