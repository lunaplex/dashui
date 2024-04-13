<script setup lang="ts">
import config from '../../config/progressbar'

const value = defineModel<number>({
	required: true
})

withDefaults(defineProps<{
	color?: keyof typeof config
	class?: any
}>(), {
	color: 'blue',
	class: 'w-full'
})
</script>

<template>
	<div :class="[$props.class, `${config[$props.color!].barBg}`]" class="rounded-full h-2">
		<div
			:class="[config[$props.color!].barColor, 'rounded-full', 'h-full']"
			:style="{ width: `${value}%` }"
		/>
	</div>
</template>