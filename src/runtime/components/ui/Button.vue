<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'normal' | 'icon'
    input?: boolean
  }>(),
  {
    size: 'normal',
    input: false
  }
)
</script>

<template>
  <button
    :class="{
      'border border-gray-200 px-3 py-2': $props.size === 'normal',
      'w-9 h-9 items-center justify-center': $props.size === 'icon',
      'justify-center': !$props.input || $props.size === 'icon',
      'focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500': $props.input
    }"
    class="flex items-center rounded-md bg-white hover:bg-gray-50 leading-snug h-[38px] transition-[background-color_box-shadow_border]"
  >
    <slot />
  </button>
</template>
