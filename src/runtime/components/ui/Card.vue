<script setup lang="ts">
import colors from '#tailwind-config/theme/colors'

defineProps<{
  class?: any
  decoration?: keyof typeof colors
}>()
</script>

<template>
  <div
    :class="$props.class"
    class="relative ring-1 ring-gray-200 rounded-lg p-6 bg-white"
  >
    <slot />
  </div>
</template>
