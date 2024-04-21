<script setup lang="ts">
import { useId } from '#imports'

withDefaults(
  defineProps<{
    text: string
    arrow?: boolean
    offset?: number
  }>(),
  {
    arrow: true,
    offset: 5
  }
)

const useIdProvider = () => useId()
</script>

<template>
  <ConfigProvider :useId="useIdProvider">
    <TooltipProvider :delayDuration="0">
      <TooltipRoot>
        <TooltipTrigger asChild>
          <slot />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            :side-offset="$props.offset"
            class="rounded-md px-2 py-1 bg-gray-700 text-white"
          >
            {{ $props.text }}
            <TooltipArrow
              v-if="$props.arrow"
              class="fill-gray-700"
              :width="8"
            />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  </ConfigProvider>
</template>
