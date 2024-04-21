<script setup lang="ts">
import { ref } from '#imports'

const value = defineModel<string>({
  required: true
})

withDefaults(
  defineProps<{
    id?: string
    placeholder?: string
    type?: 'text' | 'email' | 'url' | 'password'
    icon?: string
  }>(),
  {
    type: 'text'
  }
)

const visibility = ref(false)

const toggleVisibility = () => {
  visibility.value = !visibility.value
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
      :type="visibility ? 'text' : $props.type"
      :placeholder="$props.placeholder"
      :class="{
        'pl-9': $props.icon,
        'pl-3': !$props.icon,
        'pr-9': $props.type === 'password',
        'pr-3': $props.type !== 'password'
      }"
      class="rounded-md py-2 w-full h-full bg-transparent leading-none outline-none"
    />
    <div
      v-if="$props.type === 'password'"
      class="absolute top-0 right-0 inline-flex items-center justify-center p-2 border-2 border-transparent"
    >
      <button
        @click="toggleVisibility()"
        class="flex text-gray-500 hover:text-gray-700"
      >
        <Icon
          v-if="visibility"
          name="lucide:eye-off"
          class="w-4 h-4 transition-colors"
        />
        <Icon v-else name="lucide:eye" class="w-4 h-4 transition-colors" />
      </button>
    </div>
  </div>
</template>
