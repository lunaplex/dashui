<script setup lang="ts">
const value = defineModel<boolean>({
  required: true
})
</script>

<template>
  <SwitchRoot
    v-model:checked="value"
    class="relative flex rounded-full border-2 border-transparent w-11 h-6 data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:bg-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:hover:bg-blue-600 transition-colors"
  >
    <SwitchThumb
      class="block rounded-full my-auto w-5 h-5 bg-white shadow-sm data-[state=checked]:translate-x-full transition-transform will-change-transform"
    />
  </SwitchRoot>
</template>
