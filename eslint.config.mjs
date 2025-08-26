import uniHelper from '@uni-helper/eslint-config'

const rules = {
  'perfectionist/sort-imports': 'off',
  'perfectionist/sort-named-imports': 'off',
  'antfu/if-newline': 'off',
  'style/arrow-parens': 'off',
  'style/comma-dangle': 'off',
  'style/operator-linebreak': 'off',
  'style/brace-style': 'off',
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
}

export default uniHelper(
  {
    uni: true,
    uniJson: true,
    typescript: true,
    javascript: true,
    vue: true,
    ignores: ['src/custom-tab-bar/*.js', '*.config.mjs', '*.config.ts']
  },
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/custom-event-name-casing': ['kebab-case' | 'camelCase'],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/comma-dangle': 'off',
      'vue/max-attributes-per-line': 'off',
      ...rules
    }
  },
  {
    rules
  }
)
