<template>
  <div class="roman-numerals">
    <div class="roman-numerals__title">输入整数, 转换为罗马数字</div>
    <div class="roman-numerals__content">
      <label class="roman-numerals-input">
        <input v-model="num" placeholder="输入整数, 转换为罗马数字" type="number" />
      </label>
      <div class="roman-numerals-output">
        <div class="roman-numerals-line">
          <div class="roman-numerals-line__label">罗马数字</div>
          <code class="roman-numerals-line__value">{{ romanNumbers.unicode }}</code>
        </div>
        <!-- <div class="roman-numerals-line">
          <div class="roman-numerals-line__label"></div>
          <div class="roman-numerals-line__value">{{ romanNumbers.json }}</div>
        </div> -->
        <div class="roman-numerals-line">
          <div class="roman-numerals-line__label">罗马数字(严格千分位分割)</div>
          <code class="roman-numerals-line__value">{{ romanNumbers.unicodeT }}</code>
        </div>
        <!-- <div class="roman-numerals-line">
          <div class="roman-numerals-line__label"></div>
          <div class="roman-numerals-line__value">{{ romanNumbers.jsonT }}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type * as Foreslash from '../../../../lib/index.d.ts'

const { foreslash } = window as Window & typeof globalThis & { foreslash: typeof Foreslash }
const { romanNumerals } = foreslash
const props = withDefaults(
  defineProps<{
    defaultNumber: string | number
  }>(),
  { defaultNumber: new Date().getFullYear() }
)

const num = ref<string>(String(props.defaultNumber))

const romanNumbers = computed(() => {
  if (!num.value) {
    return {
      unicode: '',
      // js: '',
      // html: '',
      // json: '',
      unicodeT: '',
      // jsT: '',
      // htmlT: '',
      // jsonT: '',
    }
  }
  return {
    unicode: romanNumerals(num.value),
    // js: romanNumerals(num.value, { type: 'js' }),
    // html: romanNumerals(num.value, { type: 'html' }),
    // json: romanNumerals(num.value, { type: 'json' }),
    unicodeT: romanNumerals(num.value, { thousand: 'strict' }),
    // jsT: romanNumerals(num.value, { type: 'js', thousand: 'strict' }),
    // htmlT: romanNumerals(num.value, { type: 'html', thousand: 'strict' }),
    // jsonT: romanNumerals(num.value, { type: 'json', thousand: 'strict' }),
  }
})
</script>
<style lang="scss">
.roman-numerals {
  width: 100%;
  padding: 12px 16px;
  margin-top: 24px;
  border-radius: 16px;
  background: #fafafa;
	box-shadow: 8px 8px 16px #afafaf, -8px -8px 16px #ffffff;
  font-size: 16px;
  .roman-numerals__title {
    width: 100%;
    padding: 4px 16px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
  }
  .roman-numerals__content {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    .roman-numerals-input input {
      width: 100%;
      padding: 6px 8px;
      border: 4px solid #9993;
      border-radius: 8px;
      vertical-align: middle;
      font-size: 16px;
      &:focus {
        border-color: #9996;
      }
    }
    .roman-numerals-output {
      display: flex;
      // flex-direction: column;
      gap: 32px;
      margin-top: 12px;
      .roman-numerals-line {
        flex: 1 1 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__label {
        }
      }
    }
  }
}
</style>
