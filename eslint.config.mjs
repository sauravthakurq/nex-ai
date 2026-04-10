import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Vendored/generated code:
    'packages/**',
    // Claude Code local files:
    '.claude/**',
    '.superpowers/**',
    '.worktrees/**',
    // Playwright e2e tests (not React code):
    'e2e/**',
    // Local scratch files:
    'fix*.js',
    'fix*.ts',
    'final-colors.js',
    'ui.jsx',
    'test-ai-fallback.ts',
    'test-fallback.ts',
    'test_popover.tsx',
  ]),
  {
    rules: {
      // Dynamic AI-generated image URLs from various providers are incompatible
      // with next/image (requires known dimensions and whitelisted domains).
      '@next/next/no-img-element': 'off',
      // Allow unused vars/args prefixed with _ (common convention for intentionally
      // unused destructured values, callback params, etc.)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
]);

export default eslintConfig;
