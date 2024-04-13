<script setup lang="ts">
import { inject, type Ref } from '#imports'
import Avatar from '../ui/Avatar.vue'

const isSidebarOpen = inject<Ref<boolean>>('isOpen')

defineProps<{
  avatarUrl: string
  name: string
  details: string
}>()
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="relative flex items-center w-full h-[37px]">
      <Avatar
        :src="avatarUrl"
        class="absolute top-0 left-0 w-[37px] h-[37px]"
      />
      <Transition
        enter-active-class="transition-[transform_opacity] duration-200"
        leave-active-class="transition-[transform_opacity] duration-200"
        enter-from-class="-translate-x-4 opacity-0"
        leave-to-class="-translate-x-4 opacity-0"
      >
        <div v-if="isSidebarOpen" class="flex flex-col justify-center ml-12">
          <h3 class="font-semibold whitespace-nowrap">{{ $props.name }}</h3>
          <p class="text-xs text-gray-500 whitespace-nowrap">
            {{ $props.details }}
          </p>
        </div>
      </Transition>
    </div>
    <Transition
      enter-active-class="transition-[transform_opacity] duration-200"
      leave-active-class="transition-[transform_opacity] duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <button v-if="isSidebarOpen" class="flex items-center h-[37px]">
        <Icon name="solar:login-linear" class="w-5 h-5" />
      </button>
    </Transition>
  </div>
</template>
