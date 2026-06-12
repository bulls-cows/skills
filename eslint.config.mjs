import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    files: ['scripts/**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'skills/', 'skills/*/scripts/', 'skills-internal/*/scripts/'],
  },
  eslintConfigPrettier,
)
