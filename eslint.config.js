import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  unicorn.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'unicorn/prevent-abbreviations': 'off',
    },
    linterOptions: {
      noInlineConfig: true,
    },
  },
  prettierConfig,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
);
