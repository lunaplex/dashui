<script setup lang="ts">
import { computed, useId } from '#imports'
import colors from '#tailwind-config/theme/colors'
import type { ChartData as ChartJSData, ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
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

const chartOptions = computed<ChartOptions<'line'>>(() => ({
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

const chartData = computed<ChartJSData<'line'>>(() => ({
  labels: props.labels,
  datasets: props.data.map(({ label, values }, index) => ({
    label,
    data: values,
    backgroundColor: (context) => {
      const bgColor = colors[props.data[index].color || 'blue'][500] + '35'

      if (!context.chart.chartArea) return

      const {
        ctx,
        chartArea: { top, bottom }
      } = context.chart
      const bgGradient = ctx.createLinearGradient(0, top, 0, bottom)

      bgGradient.addColorStop(0, bgColor)
      bgGradient.addColorStop(0.5, bgColor)
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      return bgGradient
    },
    tension: 0,
    borderColor: colors[props.data[index].color || 'blue'][500],
    borderWidth: 2,
    pointBackgroundColor: colors[props.data[index].color || 'blue'][500],
    pointRadius: 0,
    pointHoverRadius: 0,
    fill: 'origin'
  }))
}))
</script>
<template>
  <div class="relative">
    <ClientOnly>
      <template #fallback>
        <div
          :class="$props.class"
          class="flex items-center justify-center rounded-md bg-gray-10 text-gray-400"
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
        <Line :options="chartOptions" :data="chartData" />
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
