module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'nuxt/no-cjs-in-config': 'off',
    'max-lines': [
      'error',
      { max: 400, skipBlankLines: false, skipComments: true },
    ],
  },
}
