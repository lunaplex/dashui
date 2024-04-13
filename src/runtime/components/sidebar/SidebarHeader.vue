<script setup lang="ts">
import { inject, type Ref } from '#imports'

const isParentOpen = inject<Ref<boolean>>('isOpen')

const toggleOpen = () => {
  if (isParentOpen) {
    isParentOpen!.value = !isParentOpen!.value
  } else {
    throw new Error(
      'SidebarHeader component must be used inside Sidebar component'
    )
  }
}
</script>

<template>
  <header class="border-b border-b-gray-200 mb-6 pb-4">
    <div class="relative">
      <div class="w-full h-8 overflow-hidden">
        <slot />
      </div>
      <button
        @click="toggleOpen()"
        class="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 flex items-center justify-center border border-gray-200 rounded-md w-8 h-8 bg-white hover:bg-gray-100 transition-[background-color_right] duration-200"
      >
        <Icon
          name="lucide:chevron-left"
          :class="{ 'transform rotate-180': !isParentOpen }"
          class="w-4 h-4 transition-transform duration-200"
        />
      </button>
    </div>
  </header>
</template>
