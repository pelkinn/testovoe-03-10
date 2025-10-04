import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'any', component: 'always' },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/custom-event-name-casing': ['error', 'camelCase', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
      'vue/define-macros-order': [
        'error',
        { order: ['definePageMeta', 'defineOptions', 'defineProps', 'defineEmits', 'defineModel', 'defineSlots'] }
      ],
      'vue/no-boolean-default': ['error', 'no-default'],
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'error',
      'vue/no-required-prop-with-default': ['error', { autofix: false }],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/prefer-define-options': 'error',
      'vue/require-macro-variable-name': [
        'error',
        { defineProps: 'props', defineEmits: 'emit', defineSlots: 'slots', useSlots: 'slots', useAttrs: 'attrs' }
      ],
      'vue/require-typed-ref': 'error'
    }
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
)
