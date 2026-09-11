/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/astro',
    '@dreamsicle.io/stylelint-config-tailwindcss',
  ],

  rules: {
    // Fallback for Tailwind CSS custom values
    'declaration-property-value-no-unknown': null,
    'custom-property-pattern': [
      '^(--)?[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
    ],
    'selector-class-pattern':
      '^(?:(?:block|element|modifier)-)?[a-z]+(?:-[a-z]+)*(?:__[a-z]+(?:-[a-z]+)*)?(?:--[a-z]+(?:-[a-z]+)*)?$',
    'number-max-precision': [
      4,
      {
        insideFunctions: {
          '/^(oklch|oklab|lch|lab)$/': 8,
        },
      },
    ],
  },
};
