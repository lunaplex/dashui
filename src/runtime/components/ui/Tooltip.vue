<script setup lang="ts">
import { ref, watch } from '#imports'
import { useFloating, flip, offset, shift } from '@floating-ui/vue'

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  text: string,
	position?: 'top' | 'bottom' | 'left' | 'right'
}>(), {
	position: 'top'
})

const { floatingStyles, update } = useFloating(reference, floating, {
	placement: props.position,
  middleware: [
    flip(),
    offset(8),
    shift({ padding: 5 })
  ]
})

const isHovering = ref(false)

watch(isHovering, () => {
  update()
})
</script>

<template>
  <div class="inline-block">
    <div
      ref="reference"
      @mouseenter="() => (isHovering = true)"
      @mouseleave="() => (isHovering = false)"
      class="inline-block"
    >
      <slot />
    </div>
		<Transition
			enter-active-class="transition-opacity duration-200 ease-out"
			leave-active-class="transition-opacity duration-200 ease-out"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
		>
			<div
				ref="floating"
				v-show="isHovering"
				:style="floatingStyles"
				class="rounded-md px-3 py-1.5 bg-gray-900 text-white"
			>
				{{ $props.text }}
			</div>
		</Transition>
  </div>
</template>
