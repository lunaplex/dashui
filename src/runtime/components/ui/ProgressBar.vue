<script setup lang="ts">
import config from '../../ui.config/progressbar'

const value = defineModel<number>({
  required: true
})

withDefaults(
  defineProps<{
    color?: keyof typeof config
    class?: any
  }>(),
  {
    color: 'blue',
    class: 'w-full'
  }
)
</script>

<template>
  <div
    :class="[$props.class, `${config[$props.color!].barBg}`]"
    class="rounded-full h-2"
  >
    <div
      :style="{ width: `${value}%` }"
      :class="[config[$props.color!].barColor, 'rounded-full', 'h-full']"
      class="transition-[width]"
    />
  </div>
</template>
