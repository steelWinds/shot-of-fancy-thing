import antfu from '@antfu/eslint-config';
import astro from 'eslint-plugin-astro';

export default antfu(
  {
    type: 'app',
    astro: true,
    typescript: true,
    gitignore: true,
    ignores: [
      'dist',
      '.astro',
      '.vercel',
      '**/*.yml',
    ],
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },

  ...astro.configs['jsx-a11y-recommended'],

  {
    rules: {
      'style/indent': ['error', 2],
      'style/quotes': ['error', 'single', { avoidEscape: true }],
      'style/semi': ['error', 'always'],
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/object-curly-spacing': ['error', 'always'],
      'style/array-bracket-spacing': ['error', 'never'],
      'style/space-in-parens': ['error', 'never'],
      'style/keyword-spacing': ['error', { before: true, after: true }],
      'style/arrow-spacing': ['error', { before: true, after: true }],
      'style/eol-last': ['error', 'always'],
      'style/no-trailing-spaces': 'error',

      'no-console': 'warn',
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always'],

      'astro/jsx-a11y/label-has-associated-control': 'off',
      'astro/jsx-a11y/media-has-caption': 'off',
    },
  },

  {
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.ts',
      '**/*.mts',
      '**/*.cts',
      '**/*.astro',
    ],

    rules: {
      'style/max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
);
