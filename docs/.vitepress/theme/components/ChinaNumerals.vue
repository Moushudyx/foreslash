<template>
	<div class="china-numerals">
		<div class="china-numerals__title">输入数字, 转换为中文格式</div>
		<div class="china-numerals__content">
			<label class="china-numerals-input">
				<input v-model="num" placeholder="输入数字, 支持小数" type="text" />
			</label>
			<div class="china-numerals-output">
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">默认(习惯写法)</div>
					<code class="china-numerals-line__value">{{ outputs.normal }}</code>
				</div>
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">金额</div>
					<code class="china-numerals-line__value">{{ outputs.currency }}</code>
				</div>
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">小写</div>
					<code class="china-numerals-line__value">{{ outputs.lower }}</code>
				</div>
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">大写</div>
					<code class="china-numerals-line__value">{{ outputs.upper }}</code>
				</div>
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">下数表示法</div>
					<code class="china-numerals-line__value">{{ outputs.minio }}</code>
				</div>
				<div class="china-numerals-line">
					<div class="china-numerals-line__label">上数表示法</div>
					<code class="china-numerals-line__value">{{ outputs.mega }}</code>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type * as Foreslash from '../../../../lib/index.d.ts'

const { foreslash } = window as Window & typeof globalThis & { foreslash: typeof Foreslash }
const { chinaNumerals } = foreslash

const props = withDefaults(
	defineProps<{ defaultNumber: string | number }>(),
	{ defaultNumber: new Date().getFullYear() }
)

const num = ref<string>(String(props.defaultNumber))

const outputs = computed(() => {
	if (!num.value) {
		return { normal: '', lower: '', upper: '', minio: '', mega: '' }
	}
	return {
		normal: chinaNumerals(num.value),
    currency: chinaNumerals(num.value, { integerUnit: '元', dot: '', fractionalUnits: '角分厘' }),
		lower: chinaNumerals(num.value, { type: 'lower' }),
		upper: chinaNumerals(num.value, { type: 'upper' }),
		minio: chinaNumerals(num.value, { numeralsType: 'minio' }),
		mega: chinaNumerals(num.value, { numeralsType: 'mega' }),
	}
})
</script>
<style lang="scss">
.china-numerals {
	width: 100%;
	padding: 12px 16px;
	margin-top: 24px;
	border-radius: 16px;
	background: #fafafa;
	box-shadow: 8px 8px 16px #afafaf, -8px -8px 16px #ffffff;
	font-size: 16px;
	.china-numerals__title {
		width: 100%;
		padding: 4px 16px;
		box-sizing: border-box;
		font-size: 20px;
		font-weight: bold;
	}
	.china-numerals__content {
		width: 100%;
		padding: 12px 16px;
		box-sizing: border-box;
		.china-numerals-input input {
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
		.china-numerals-output {
			display: flex;
			gap: 32px;
      flex-wrap: wrap;
			margin-top: 12px;
			.china-numerals-line {
				width: calc(50% - 16px);
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
