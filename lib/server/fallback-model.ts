import type { LanguageModelV1 } from '@ai-sdk/provider';

export function createFallbackModel(models: LanguageModelV1[]): LanguageModelV1 {
  if (models.length === 0) throw new Error("No models provided for fallback");
  if (models.length === 1) return models[0];

  const primary = models[0];
  return {
    specificationVersion: primary.specificationVersion,
    provider: primary.provider,
    modelId: primary.modelId,
    defaultObjectGenerationMode: primary.defaultObjectGenerationMode,
    supportsImageUrls: primary.supportsImageUrls,
    doGenerate: async (options) => {
      let lastError;
      for (const model of models) {
        try {
          return await model.doGenerate(options);
        } catch (e) {
          lastError = e;
          console.warn(`[Fallback] Model ${model.modelId} failed, falling back to next...`);
        }
      }
      throw lastError;
    },
    doStream: async (options) => {
      let lastError;
      for (const model of models) {
        try {
          return await model.doStream(options);
        } catch (e) {
          lastError = e;
          console.warn(`[Fallback] Model ${model.modelId} failed stream, falling back...`);
        }
      }
      throw lastError;
    }
  };
}
