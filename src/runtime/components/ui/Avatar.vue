<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <NuxtImg
    class="rounded-full"
    :src="src"
    :placeholder="37"
    width="37"
    height="37"
  />
</template>
