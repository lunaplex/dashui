<script setup lang="ts">
import { computed, useId } from '#imports'
import colors from '#tailwind-config/theme/colors'
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useTooltip } from '../../composables/useTooltip'

interface ChartData {
  label: string
  values: number[]
  color?: keyof typeof colors
}

const props = defineProps<{
  labels: string[]
  data: ChartData[]
  legend?: boolean | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  class?: string
}>()

const id = useId()

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  layout: {
    padding: {
      top: 2,
      left: 2,
      right: 2
    }
  },
  plugins: {
    legend: {
      display: false
    },
    htmlLegend: {
      containerId: id
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: useTooltip
    },
    filler: {
      propagate: false
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
}))

const chartData = computed<ChartJSData<'bar'>>(() => ({
  labels: props.labels,
  datasets: props.data.map(({ label, values }, index) => ({
    label,
    data: values,
    backgroundColor: colors[props.data[index].color || 'blue'][500],
    tension: 0,
    borderWidth: 0,
    borderRadius: 4
  }))
}))
</script>
<template>
  <div class="relative">
    <ClientOnly>
      <template #fallback>
        <div
          :class="$props.class"
          class="flex items-center justify-center text-gray-400"
        >
          <Icon name="solar:record-broken" class="w-6 h-6 animate-spin" />
        </div>
      </template>
      <div
        v-if="
          $props.legend === true ||
          $props.legend === 'top-left' ||
          $props.legend === 'top-right'
        "
        :id="`dashui-legend-${id}`"
        :class="{ 'justify-end': $props.legend === 'top-right' }"
        class="flex"
      ></div>
      <div :class="$props.class">
        <Bar :options="chartOptions" :data="chartData" />
      </div>
      <div
        v-if="
          $props.legend === 'bottom-left' || $props.legend === 'bottom-right'
        "
        :id="`dashui-legend-${id}`"
        :class="{ 'justify-end': $props.legend === 'bottom-right' }"
        class="flex"
      ></div>
    </ClientOnly>
  </div>
</template>
