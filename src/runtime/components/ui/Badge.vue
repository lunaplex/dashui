<script setup lang="ts">
import { ref } from '#imports'
import config from '../../ui.config/badge'

const props = withDefaults(
  defineProps<{
    color?: keyof typeof config
    icon?: string
    rounded?: boolean
  }>(),
  {
    color: 'blue'
  }
)

const color = ref(config[props.color])
</script>

<template>
  <div
    :class="[color.text, rounded ? 'rounded-full' : 'rounded-md']"
    class="ring-1 ring-gray-200 space-x-1.5 px-2 py-0.5 bg-white leading-none cursor-default"
  >
    <Icon
      v-if="$props.icon"
      :name="$props.icon"
      class="-ml-1 w-4 h-4 inline-block"
    />
    <slot />
  </div>
</template>
