<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    data: {
      labels: string[]
      values: string[]
      colors: any
    }[]
    prefix?: string
    suffix?: string
  }>(),
  {
    prefix: '',
    suffix: ''
  }
)
</script>

<template>
  <div
    class="ring-1 ring-gray-200 rounded-md w-fit min-w-fit bg-white shadow-md z-10"
  >
    <div class="border-b border-b-gray-200 px-3 py-1.5 text-xs font-semibold">
      {{ $props.title }}
    </div>
    <ul class="px-3 py-1.5">
      <li
        v-for="line in $props.data"
        class="flex items-center justify-between w-full"
      >
        <div class="flex items-center">
          <span
            class="rounded-full w-2 min-w-2 h-2"
            :style="{ backgroundColor: line.colors }"
          />
          <span class="ml-2 text-xs text-gray-500 font-medium">{{
            line.labels.join(', ')
          }}</span>
        </div>
        <span class="ml-2 text-xs font-semibold">{{
          prefix + line.values.join(', ') + suffix
        }}</span>
      </li>
    </ul>
  </div>
</template>
