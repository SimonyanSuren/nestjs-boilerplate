module.exports = {
  env: {
    jest: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/common/db/migrations/*.ts'],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'import',
    'unicorn',
    'sonarjs',
    'promise',
    'canonical',
    'n',
    'jsonc',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        project: ['./tsconfig.eslint.json'],
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:unicorn/recommended',
        'plugin:import/recommended',
        'plugin:sonarjs/recommended',
        'plugin:promise/recommended',
        'plugin:n/recommended',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
      ],
      rules: {
        /*
         * plugin:n
         * ======================================================
         */
        'n/no-extraneous-import': 'off',
        'n/no-missing-import': 'off',
        /*
         * plugin:canonical
         * ======================================================
         */
        'canonical/no-restricted-strings': 'error',
        'canonical/no-use-extend-native': 'error',
        'canonical/prefer-inline-type-import': 'error',
        'canonical/filename-match-exported': 'error',
        'canonical/no-unused-exports': ['off', { tsConfigPath: './tsconfig.eslint.json' }],
        // 'canonical/id-match': [
        //   'error',
        //   '(^[A-Za-z]+(?:[A-Z][a-z]*)*\\d*$)|(^[A-Z]+(_[A-Z]+)*(_\\d$)*$)|(^(_|\\$)$)',
        //   {
        //     'ignoreDestructuring': true,
        //     'ignoreNamedImports': true,
        //     'onlyDeclarations': true,
        //     'properties': true,
        //   },
        // ],
        /*
         * plugin:unicorn
         * ======================================================
         */
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-static-only-class': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/expiring-todo-comments': 'off',
        'unicorn/no-array-method-this-argument': 'off',
        'unicorn/switch-case-braces': 'off',
        'unicorn/no-empty-file': 'warn',
        /*
         * plugin:sonarjs
         * ======================================================
         */
        'sonarjs/no-duplicate-string': 'off',
        /*
         * plugin:import
         * ======================================================
         */
        'import/no-unresolved': ['error'],
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/newline-after-import': 'error',
        /**
         * plugin:simple-import-sort
         * ======================================================
         */
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        /**
         * plugin:prettier/recommended
         * ======================================================
         */
        'prettier/prettier': 'error',
        /**
         * plugin:eslint
         * ======================================================
         */
        //'no-tabs': ['error', { allowIndentationTabs: true }],
        //"indent": "off",
        'no-await-in-loop': 'error',
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: '*', next: 'try' },
          { blankLine: 'always', prev: 'try', next: '*' },
          { blankLine: 'always', prev: '*', next: 'block-like' },
          { blankLine: 'always', prev: 'block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: 'throw' },
          { blankLine: 'always', prev: 'var', next: '*' },
        ],
        'arrow-body-style': 'error',
        'arrow-parens': ['error', 'always'],
        complexity: 'off',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/Rx',
                message: "Please import directly from 'rxjs' instead",
              },
            ],
          },
        ],
        'object-curly-spacing': ['error', 'always'],
        'no-multi-spaces': 'error',
        'no-useless-return': 'error',
        'no-else-return': 'error',
        'no-implicit-coercion': ['error', { allow: ['!!', '~'] }],
        'constructor-super': 'error',
        yoda: 'error',
        strict: ['error', 'never'],
        curly: 'off',
        'dot-notation': 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-match': 'error',
        'max-classes-per-file': 'off',
        'max-len': [
          'error',
          {
            code: 150,
          },
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-constant-condition': 'error',
        'no-dupe-else-if': 'error',
        'lines-between-class-members': ['error', 'always'],
        'no-console': [
          'error',
          {
            allow: [
              'info',
              'dirxml',
              'warn',
              'error',
              'dir',
              'timeLog',
              'assert',
              'clear',
              'count',
              'countReset',
              'group',
              'groupCollapsed',
              'groupEnd',
              'table',
              'Console',
              'markTimeline',
              'profile',
              'profileEnd',
              'timeline',
              'timelineEnd',
              'timeStamp',
              'context',
            ],
          },
        ],
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'error',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': [
          'error',
          {
            max: 1,
          },
        ],
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-redeclare': 'error',
        'no-return-await': 'off',
        'no-sequences': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        radix: 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off',
        'space-before-function-paren': 'off',
        /**
         * plugin:typescript-eslint
         * ======================================================
         */

        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            ignoreIIFE: true,
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        'max-params': ['error', 7],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message: 'Avoid using the `Object` type. Did you mean `object`?',
              },
              Function: {
                message:
                  'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
              },
              Boolean: {
                message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                fixWith: 'boolean',
              },
              Number: {
                message: 'Avoid using the `Number` type. Did you mean `number`?',
                fixWith: 'number',
              },
              Symbol: {
                message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                fixWith: 'symbol',
              },
              String: {
                message: 'Avoid using the `String` type. Did you mean `string`?',
                fixWith: 'string',
              },
              '{}': {
                message: 'Use Record<K, V> instead',
                fixWith: 'Record<K, V>',
              },
              object: {
                message: 'Use Record<K, V> instead',
                fixWith: 'Record<K, V>',
              },
            },
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            overrides: {
              constructors: 'off',
            },
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
            filter: {
              regex: '^_.*$',
              match: false,
            },
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            modifiers: ['exported'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
            filter: '/required/$',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'property',
            format: ['camelCase', 'UPPER_CASE'],
            custom: {
              regex: '.*ID$',
              match: false,
            },
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            prefix: ['I'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
        ],
      },
    },
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      extends: [
        'plugin:jsonc/base',
        'plugin:jsonc/prettier',
        'plugin:jsonc/recommended-with-json',
        'plugin:jsonc/recommended-with-jsonc',
        'plugin:jsonc/recommended-with-json5',
      ],
      rules: {
        'jsonc/no-comments': 'off',
      },
    },
    {
      files: ['main.ts'],
      rules: {
        'no-return-await': ['off'],
        'unicorn/prefer-top-level-await': ['off'],
      },
    },
  ],
};
