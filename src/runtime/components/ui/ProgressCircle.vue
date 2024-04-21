<script setup lang="ts">
import { computed } from '#imports'
import config from '../../ui.config/progresscircle'

const value = defineModel<number>({
  required: true
})

const props = withDefaults(
  defineProps<{
    radius?: number
    color?: keyof typeof config
  }>(),
  {
    radius: 32,
    color: 'blue'
  }
)

const circumference = computed(() => calculateDashArray())
const offset = computed(() => calculateDashOffset())

const calculateDashArray = () => {
  const normalizedRadius = props.radius - 6 / 2

  return normalizedRadius * 2 * Math.PI
}

const calculateDashOffset = () => {
  const strokeDashOffset = (value.value / 100) * circumference.value

  return circumference.value - strokeDashOffset
}
</script>

<template>
  <div
    :style="{
      width: `${$props.radius! * 2}px`,
      height: `${$props.radius! * 2}px`
    }"
    class="relative"
  >
    <svg
      class="transform -rotate-90"
      :width="$props.radius! * 2"
      :height="$props.radius! * 2"
      :viewBox="`0 0 ${$props.radius! * 2} ${$props.radius! * 2}`"
    >
      <circle
        :r="$props.radius! - 6 / 2"
        :cx="$props.radius"
        :cy="$props.radius"
        stroke-width="6"
        fill="transparent"
        stroke=""
        stroke-linecap="round"
        :class="[$props.class, `${config[$props.color!].barBg}`]"
        class="transition-all duration-200 ease-in-out"
      />
      <circle
        :r="$props.radius! - 6 / 2"
        :cx="$props.radius"
        :cy="$props.radius"
        stroke-width="6"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :stroke-dashoffset="offset"
        fill="transparent"
        stroke=""
        stroke-linecap="round"
        :class="[$props.class, `${config[$props.color!].barColor}`]"
        class="transition-all duration-200 ease-in-out"
      />
    </svg>
    <div
      class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
    >
      <slot />
    </div>
  </div>
</template>
