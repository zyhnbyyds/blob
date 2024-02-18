import { sxzz } from '@sxzz/eslint-config';

export default sxzz({
  rules: {
    'import/no-default-export': 'off',
    'no-duplicate-imports': 'off',
    'require-await': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
  },
});
