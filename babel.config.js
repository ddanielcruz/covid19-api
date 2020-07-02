module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/shared/models',
          '@helpers': './src/shared/helpers',
          '@services': './src/shared/services',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
