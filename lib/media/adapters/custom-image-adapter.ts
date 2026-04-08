/**
 * Custom Image Generation Adapter
 *
 * Uses OpenAI-compatible synchronous API format.
 */

import type {
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
} from '../types';

const DEFAULT_MODEL = 'dall-e-3';

export async function testCustomImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  const baseUrl = config.baseUrl || 'https://api.openai.com/v1';
  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model || DEFAULT_MODEL,
        prompt: '',
        n: 1,
      }),
    });
    if (response.status === 401 || response.status === 403) {
      const text = await response.text();
      return {
        success: false,
        message: `Custom Image auth failed (${response.status}): ${text}`,
      };
    }
    return { success: true, message: 'Connected to Custom Image provider' };
  } catch (err) {
    return { success: false, message: `Custom Image connectivity error: ${err}` };
  }
}

export async function generateWithCustomImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  const baseUrl = config.baseUrl || 'https://api.openai.com/v1';

  const response = await fetch(`${baseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || DEFAULT_MODEL,
      prompt: options.prompt,
      n: 1,
      response_format: 'url',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Custom image generation failed (${response.status}): ${text}`);
  }

  const data = await response.json();

  // OpenAI-compatible response format: { data: [{ url, revised_prompt }] }
  const imageData = data.data?.[0];
  if (!imageData) {
    throw new Error('Provider returned empty image response');
  }

  return {
    url: imageData.url,
    base64: imageData.b64_json,
    width: options.width || 1024,
    height: options.height || 1024,
  };
}
