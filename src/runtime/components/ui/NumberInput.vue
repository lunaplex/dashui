<script setup lang="ts">
const value = defineModel<number>({
  required: true
})

const props = withDefaults(
  defineProps<{
    id?: string
    step?: number
    min?: number
    max?: number
    placeholder?: string
    icon?: string
  }>(),
  {
    step: 1
  }
)

const increment = () => {
  if (props.max && value.value >= props.max) return
  value.value += props.step
}

const decrement = () => {
  if (props.min && value.value <= props.min) return
  value.value -= props.step
}
</script>

<template>
  <div
    class="relative inline-flex focus-within:ring-2 focus-within:ring-blue-500/15 border border-gray-200 focus-within:border-blue-500 rounded-md h-[38px] bg-white hover:bg-gray-50 transition-[background-color_box-shadow_border]"
  >
    <div
      v-if="$props.icon"
      class="absolute top-0 left-0 inline-flex items-center justify-center w-9 h-full pointer-events-none"
    >
      <Icon :name="$props.icon" class="w-4 h-4 text-gray-500" />
    </div>
    <input
      :id="$props.id"
      v-model="value"
      :placeholder="$props.placeholder"
      type="number"
      :min="$props.min"
      :max="$props.max"
      :class="{
        'pl-8': $props.icon,
        'pl-3': !$props.icon
      }"
      class="rounded-md py-2 w-full h-full bg-transparent leading-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    <div class="inline-flex h-full">
      <button
        @click="decrement()"
        class="flex items-center justify-center border-l border-l-gray-200 w-[38px] h-full text-gray-500 hover:text-gray-700"
      >
        <Icon name="tabler:minus" class="w-4 h-4 transition-colors" />
      </button>
      <button
        @click="increment()"
        class="flex items-center justify-center border-l border-l-gray-200 w-[38px] h-full text-gray-500 hover:text-gray-700"
      >
        <Icon name="tabler:plus" class="w-4 h-4 transition-colors" />
      </button>
    </div>
  </div>
</template>
