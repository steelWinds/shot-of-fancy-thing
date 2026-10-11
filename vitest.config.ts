/// <reference types="vitest/config" />

import { svelteTesting } from '@testing-library/svelte/vite';
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  plugins: [
    svelteTesting(),
  ],

  test: {
    environment: 'jsdom',
    include: [
      '__tests__/unit/**/*.test.ts',
    ],
    setupFiles: [
      './__tests__/setup.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,svelte}'],
      exclude: ['src/**/*.d.ts'],
    },
    reporters: ['tree'],
  },
});
