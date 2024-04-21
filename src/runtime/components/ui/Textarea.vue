<script setup lang="ts">
const value = defineModel<string>({
  required: true
})

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {}
)
</script>

<template>
  <textarea
    v-model="value"
    :placeholder="$props.placeholder"
    class="block focus:ring-2 focus:ring-blue-500/15 rounded-md border border-gray-200 focus:border-blue-500 px-3 py-2 outline-none transition-[background-color_box-shadow_border]"
    v-text="value"
  />
</template>
