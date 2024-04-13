<script setup lang="ts">
import { Chart } from 'chart.js'

defineProps<{
  chart: Chart<any>
  data: {
    text: string
    color: string
  }[]
}>()
</script>

<template>
  <ul class="flex space-x-4">
    <li v-for="(item, index) in data">
      <button
        @click="
          () => {
            $props.chart.setDatasetVisibility(
              index,
              !$props.chart.isDatasetVisible(index)
            )
            chart.update()
          }
        "
        :class="{
          'text-gray-300 hover:text-gray-500':
            !$props.chart.isDatasetVisible(index),
          'hover:bg-gray-100 text-gray-500':
            $props.chart.isDatasetVisible(index)
        }"
        class="group/legend flex items-center rounded-md space-x-2 px-1 py-0.5 transition-colors"
      >
        <span
          :style="{ backgroundColor: item.color }"
          :class="{ 'opacity-60': !$props.chart.isDatasetVisible(index) }"
          class="rounded-full w-2 min-w-2 h-2 group-hover/legend:opacity-100 transition-opacity"
        />
        <span class="text-xs group-hover/legend:text-gray-500 font-medium">{{
          item.text
        }}</span>
      </button>
    </li>
  </ul>
</template>
