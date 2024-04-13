<script setup lang="ts">
const value = defineModel<string>({
	required: true
})
</script>

<template>
	<div class="reltive inline-block">
		<input v-model="value" class="ring-1 ring-gray-200 rounded-md px-2.5 h-8 outline-none" />
	</div>
</template>
