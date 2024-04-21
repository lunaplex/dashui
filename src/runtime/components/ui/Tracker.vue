<script setup lang="ts">
import Tooltip from './Tooltip.vue'
import config from '../../ui.config/tracker'
import type { TrackerData } from '../../types/tracker'

withDefaults(
  defineProps<{
    data: TrackerData[]
    class?: any
  }>(),
  {
    class: 'w-full h-10'
  }
)
</script>

<template>
  <div :class="$props.class" class="flex items-center space-x-0.5">
    <template v-for="(item, index) in $props.data" :key="index">
      <Tooltip v-if="item.tooltip" :text="item.tooltip">
        <div
          :class="config[item.color || 'gray'].bg"
          class="first:rounded-l last:rounded-r rounded-[1px] w-full h-full"
        />
      </Tooltip>
      <div
        v-else
        :class="config[item.color || 'gray'].bg"
        class="first:rounded-l last:rounded-r rounded-[1px] w-full h-full"
      />
    </template>
  </div>
</template>
