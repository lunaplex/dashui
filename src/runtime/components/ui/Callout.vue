<script setup lang="ts">
import { ref } from '#imports'
import config from '../../config/callout'

const props = withDefaults(
  defineProps<{
    title: string
    color?: keyof typeof config
    icon?: string
  }>(),
  {
    color: 'blue'
  }
)

const color = ref(config[props.color])
</script>

<template>
  <div class="flex ring-1 ring-gray-200 rounded-md p-1">
    <div :class="color.bg" class="flex-1 rounded-full w-1 max-w-1" />
    <div class="space-y-2 px-3 py-2">
      <h4 class="flex items-center space-x-2 text-inherit font-semibold">
        <Icon v-if="icon" :name="icon" class="w-4 h-4 inline-block" />
        <span>{{ title }}</span>
      </h4>
      <slot />
    </div>
  </div>
</template>
