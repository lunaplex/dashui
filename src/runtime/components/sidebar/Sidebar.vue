<script setup lang="ts">
import { ref, provide } from '#imports'

const isOpen = ref(true)

provide('isOpen', isOpen)
</script>

<template>
  <aside
    aria-label="sidebar"
    :class="{ 'w-64': isOpen, 'w-[70px]': !isOpen }"
    class="border-r border-r-gray-200 h-screen bg-white transition-[width] duration-200"
  >
    <div class="flex flex-col h-full p-4">
      <slot :open="isOpen" />
    </div>
  </aside>
</template>
