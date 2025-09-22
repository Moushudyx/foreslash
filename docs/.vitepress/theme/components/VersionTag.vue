<template>
  <div class="version-tag" :style="{ '--tag-color': styleColor }" :title="`${version}`">
    <div class="version-tag-bg"></div>
    <slot>
      <span>v{{ version }}</span>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color: string
    version: string
  }>(),
  { color: 'primary' }
)
const styleColor = computed(() => {
  const { color } = props
  const colorMap: Record<string, string> = {
    primary: 'var(--primary-color, #6be)',
    default: 'var(--secondary-color, #6be)',
  }
  if (!color) return colorMap.default
  if (colorMap[color]) return colorMap[color]
  return colorMap.default
})
</script>
<style lang="scss">
.version-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4px 8px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--tag-color);
  box-sizing: border-box;
  font-size: 14px;
  line-height: 14px;
  color: var(--tag-color);
  .version-tag-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 0.1;
    background-color: var(--tag-color);
    pointer-events: none;
    z-index: 0;
  }
}
</style>
