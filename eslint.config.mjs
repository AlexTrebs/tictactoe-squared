import config from 'eslint-config-xo';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  config,
  {
    files: ['**'],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^React$',
        },
      ],
      'sort-imports': ['error', {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        allowSeparatedGroups: false,
      }],
    },
  },
]);
