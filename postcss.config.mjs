const POSTCSS_PX_TO_REM_ROOT_VALUE = 16;

export default {
  plugins: {
    '@csstools/postcss-global-data': {
      files: [
        './src/shared/assets/styles/custom-media.css',
      ],
    },

    'postcss-preset-env': {
      stage: 2,

      features: {
        'nesting-rules': true,

        'color-mix': {
          preserve: true,
        },

        'oklab-function': {
          preserve: true,
        },

        'custom-media-queries': true,
      },
    },

    'postcss-pxtorem': {
      rootValue: POSTCSS_PX_TO_REM_ROOT_VALUE,

      propList: [
        '*',
      ],
    },
  },
};
