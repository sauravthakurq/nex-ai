import { ImageGenerationConfig, ImageGenerationOptions, ImageGenerationResult } from '../types';

export async function testPollinationsConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  try {
    const baseUrl = config.baseUrl || 'https://gen.pollinations.ai';
    const testUrl = new URL('/image/test', baseUrl);
    if (config.apiKey) testUrl.searchParams.set('key', config.apiKey);

    // Some endpoints don't support HEAD so let's do a fast GET or accept 404
    const response = await fetch(testUrl.toString(), { method: 'HEAD' });
    if (
      !response.ok &&
      response.status !== 400 &&
      response.status !== 404 &&
      response.status !== 405
    ) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function generateWithPollinations(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  const baseUrl = config.baseUrl || 'https://gen.pollinations.ai';
  const model = config.model || 'flux';

  const targetUrl = new URL('/image/' + encodeURIComponent(options.prompt), baseUrl);
  targetUrl.searchParams.set('model', model);

  if (options.width && options.height) {
    targetUrl.searchParams.set('width', options.width.toString());
    targetUrl.searchParams.set('height', options.height.toString());
  }

  if (config.apiKey) {
    targetUrl.searchParams.set('key', config.apiKey);
  }

  targetUrl.searchParams.set('nologo', 'true');

  return {
    url: targetUrl.toString(),
    width: options.width || 1024,
    height: options.height || 1024,
  };
}
