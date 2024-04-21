<script setup lang="ts">
import { computed } from '#imports'
import type { SelectItem } from '../../types/select'

const value = defineModel<string | string[]>({
  required: true
})

const props = withDefaults(
  defineProps<{
    options: SelectItem[]
    placeholder?: string
    searchable?: boolean
    multiple?: boolean
    class?: string
  }>(),
  {
    searchable: false,
    multiple: false
  }
)

const placeholder = computed(
  () =>
    props.placeholder ||
    (props.multiple ? 'Select options' : 'Select an option')
)
</script>

<template>
  <ComboboxRoot
    v-if="searchable || multiple"
    v-model="value"
    :multiple="$props.multiple"
    :class="$props.class"
  >
    <ComboboxAnchor>
      <ComboboxTrigger
        :class="{ 'pl-2': $props.multiple, 'pr-3': !$props.multiple }"
        class="group flex items-center justify-between data-[state=open]:ring-2 data-[state=open]:ring-blue-500/15 border border-gray-200 data-[state=open]:border-blue-500 rounded-md pr-3 py-2 w-full h-[38px] bg-white hover:bg-gray-50 leading-snug outline-none transition-[background-color_box-shadow_border]"
      >
        <div v-if="$props.multiple && Array.isArray(value)" class="space-x-1">
          <template v-if="value.length > 0">
            <span
              v-for="(v, index) of value"
              :key="index"
              class="rounded-md border border-gray-200 px-1.5 py-0.5 bg-gray-50 text-xs font-medium leading-none"
            >
              {{ v }}
            </span>
          </template>
          <span v-else class="pl-1 text-gray-400">
            {{ placeholder }}
          </span>
        </div>
        <ComboboxInput
          v-else
          :placeholder="placeholder"
          class="p-3 w-full bg-transparent leading-none outline-none"
        />
        <Icon
          name="lucide:chevron-down"
          class="w-4 h-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <Transition
        enter-active-class="transition-opacity"
        leave-active-class="transition-opacity"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <ComboboxContent
          position="popper"
          :sideOffset="5"
          class="rounded-lg border border-gray-200 w-[--radix-popper-anchor-width] bg-white shadow-lg data-[state=open]:data-[side=top]:animate-selectSlideUp data-[state=open]:data-[side=bottom]:animate-selectSlideDown"
        >
          <ComboboxViewport class="divide-y divide-gray-200">
            <div v-if="$props.multiple" class="relative w-full">
              <div
                class="absolute top-0 left-0 flex items-center justify-center w-[38px] h-[38px] pointer-events-none"
              >
                <Icon name="lucide:search" class="w-4 h-4 text-gray-500" />
              </div>
              <ComboboxInput
                :placeholder="placeholder"
                class="pl-9 pr-3 py-2 w-full h-9 bg-transparent leading-snug outline-none"
              />
            </div>
            <ComboboxEmpty
              :class="{
                'rounded-b-lg': $props.multiple,
                'rounded-lg': !$props.multiple
              }"
              class="p-3 text-gray-500 leading-none"
            />

            <ComboboxItem
              v-for="(option, index) of $props.options"
              :key="index"
              :value="option.label"
              class="first:rounded-t-lg last:rounded-b-lg px-3 py-2 h-9 hover:bg-gray-50 data-[highlighted]:bg-gray-50 data-[state=checked]:bg-gray-50 leading-snug cursor-pointer outline-none transition-colors"
            >
              <span>
                {{ option.label }}
              </span>
            </ComboboxItem>
          </ComboboxViewport>
        </ComboboxContent>
      </Transition>
    </ComboboxPortal>
  </ComboboxRoot>
  <SelectRoot v-else v-model="value as string">
    <SelectTrigger
      :class="$props.class"
      class="group flex items-center justify-between data-[state=open]:ring-2 data-[state=open]:ring-blue-500/15 border border-gray-200 data-[state=open]:border-blue-500 rounded-md px-3 py-2 h-[38px] bg-white hover:bg-gray-50 leading-snug outline-none transition-[background-color_box-shadow_border]"
    >
      <SelectValue
        :placeholder="placeholder"
        :class="{
          'text-gray-400': !$props.options.find(
            (option) => option.label === value
          )
        }"
      />
      <Icon
        name="lucide:chevron-down"
        class="w-4 h-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
      />
    </SelectTrigger>
    <SelectPortal>
      <Transition
        enter-active-class="transition-opacity"
        leave-active-class="transition-opacity"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <SelectContent
          position="popper"
          :sideOffset="5"
          class="rounded-lg border border-gray-200 w-[--radix-select-trigger-width] bg-white shadow-lg data-[state=open]:data-[side=top]:animate-selectSlideUp data-[state=open]:data-[side=bottom]:animate-selectSlideDown"
        >
          <SelectScrollUpButton>
            <Icon name="lucide:chevron-up" class="w-4 h-4 text-gray-500" />
          </SelectScrollUpButton>

          <SelectViewport class="divide-y divide-gray-200">
            <SelectItem
              v-for="(option, index) of $props.options"
              :key="index"
              :value="option.label"
              class="first:rounded-t-lg last:rounded-b-lg px-3 py-2 h-9 hover:bg-gray-50 data-[highlighted]:bg-gray-50 data-[state=checked]:bg-gray-50 leading-snug cursor-pointer outline-none transition-colors"
            >
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Transition>
    </SelectPortal>
  </SelectRoot>
</template>
