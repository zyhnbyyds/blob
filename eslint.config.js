import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'

export default antfu(
  {
    formatters: {
      css: false,
      html: true,
    },
    unocss: true,
  },
  {
    files: ['./style/css/*.css'],
    languageOptions: {
      parser: format.parserPlain,
    },
    plugins: {
      format,
    },
    rules: {
      'format/prettier': ['error', { parser: 'css', tabWidth: 2 }],
    },
  },
  {
    ignores: ['docker'],
  },
)
