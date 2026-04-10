'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, User, Users, Sparkles, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/hooks/use-i18n';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { AgentConfig } from '@/lib/orchestration/registry/types';
import { useAgentRegistry } from '@/lib/orchestration/registry/store';
import { useSettingsStore } from '@/lib/store/settings';
import { getTTSVoices } from '@/lib/audio/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import azureVoicesData from '@/lib/audio/azure.json';

interface AgentSettingsProps {
  agents: AgentConfig[];
  selectedAgentIds: string[];
  maxTurns: string;
  agentMode: 'preset' | 'auto';
  onToggleAgent: (agentId: string) => void;
  onMaxTurnsChange: (value: string) => void;
  onAgentModeChange: (mode: 'preset' | 'auto') => void;
}

export function AgentSettings({
  agents,
  selectedAgentIds,
  maxTurns,
  agentMode,
  onToggleAgent,
  onMaxTurnsChange,
  onAgentModeChange,
}: AgentSettingsProps) {
  const { t } = useI18n();

  const getAgentName = (agent: AgentConfig) => {
    const key = `settings.agentNames.${agent.id}`;
    const translated = t(key);
    return translated !== key ? translated : agent.name;
  };

  const getAgentRole = (agent: AgentConfig) => {
    const key = `settings.agentRoles.${agent.role}`;
    const translated = t(key);
    return translated !== key ? translated : agent.role;
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        {/* Mode Toggle */}
        <div className="space-y-2">
          <Label>{t('settings.agentMode')}</Label>
          <div className="inline-flex rounded-lg border bg-muted/30 p-0.5">
            <button
              onClick={() => onAgentModeChange('preset')}
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
                agentMode === 'preset'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t('settings.agentModePreset')}
            </button>
            <button
              onClick={() => onAgentModeChange('auto')}
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5',
                agentMode === 'auto'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t('settings.agentModeAuto')}
            </button>
          </div>
        </div>

        {agentMode === 'preset' ? (
          <>
            {/* Preset mode: existing agent multi-select */}
            <div className="space-y-2">
              <Label>{t('settings.selectAgents') || 'Configure Characters'}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.agentSettingsDesc') ||
                  "Configure each character's name and voice. Check to enable them."}
              </p>
            </div>

            <div className="space-y-3 border rounded-lg p-2 bg-muted/30">
              {agents.map((agent) => {
                const isSelected = selectedAgentIds.includes(agent.id);
                const ttsProviderId = useSettingsStore.getState()?.ttsProviderId || 'openai-tts';
                const voices =
                  ttsProviderId === 'azure-tts'
                    ? azureVoicesData.voices.map((v) => ({ id: v.ShortName, name: v.LocalName }))
                    : getTTSVoices(ttsProviderId);

                return (
                  <div
                    key={agent.id}
                    className={cn(
                      'flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3 p-3 rounded-lg border transition-all',
                      isSelected
                        ? 'bg-primary/5 border-primary/50'
                        : 'bg-background hover:bg-muted/50 border-transparent',
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`agent-${agent.id}`}
                        checked={isSelected}
                        onCheckedChange={() => onToggleAgent(agent.id)}
                        disabled={agent.role === 'teacher'}
                      />
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage src={agent.avatar} alt={getAgentName(agent)} />
                        <AvatarFallback>{getAgentName(agent).charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground ml-1">Name</Label>
                        <div className="flex items-center gap-1.5">
                          <Input
                            value={agent.name}
                            onChange={(e) =>
                              useAgentRegistry
                                .getState()
                                .updateAgent(agent.id, { name: e.target.value })
                            }
                            className="h-8 text-sm"
                            placeholder={getAgentName(agent)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground ml-1">Voice</Label>
                        <Select
                          value={agent.voiceConfig?.voiceId || voices[0]?.id}
                          onValueChange={(val) =>
                            useAgentRegistry.getState().updateAgent(agent.id, {
                              voiceConfig: { providerId: ttsProviderId, voiceId: val },
                            })
                          }
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {voices.map((v) => (
                              <SelectItem key={v.id} value={v.id}>
                                {v.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mode indicator */}
            <div
              className={`p-3 rounded-lg text-sm ${
                selectedAgentIds.length === 0
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  : selectedAgentIds.length === 1
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
              }`}
            >
              {selectedAgentIds.length === 0 && (
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  {t('settings.atLeastOneAgent')}
                </span>
              )}
              {selectedAgentIds.length === 1 && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <strong>{t('settings.singleAgentMode')}</strong> -{' '}
                  {(() => {
                    const agent = agents.find((a) => a.id === selectedAgentIds[0]);
                    return agent ? getAgentName(agent) : t('settings.selectedAgent');
                  })()}{' '}
                  {t('settings.directAnswer')}
                </span>
              )}
              {selectedAgentIds.length > 1 && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <strong>{t('settings.multiAgentMode')}</strong> -{' '}
                  {t('settings.agentsCollaboratingCount', {
                    count: selectedAgentIds.length,
                  })}
                </span>
              )}
            </div>

            {/* Max turns config - only show for multi-agent */}
            {selectedAgentIds.length > 1 && (
              <div className="space-y-2 border-l-4 border-purple-500 pl-4">
                <Label>{t('settings.maxTurns')}</Label>
                <p className="text-xs text-muted-foreground">{t('settings.maxTurnsDesc')}</p>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={maxTurns}
                  onChange={(e) => onMaxTurnsChange(e.target.value)}
                  className="w-24"
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Auto mode: description */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 text-sm">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{t('settings.agentModeAutoDesc')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
