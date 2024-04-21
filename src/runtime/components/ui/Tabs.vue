<script setup lang="ts">
import { useId } from '#imports'
import type { TabItem } from '../../types/tabs'

withDefaults(
  defineProps<{
    items: TabItem[]
    orientation?: 'horizontal' | 'vertical'
    class?: string
  }>(),
  {
    orientation: 'horizontal',
    class: 'w-full'
  }
)

const useIdProvider = () => useId()
</script>

<template>
  <ConfigProvider :useId="useIdProvider">
    <TabsRoot
      :orientation="$props.orientation"
      :defaultValue="$props.items[0].label"
      :class="$props.class"
    >
      <TabsList
        :class="{ 'flex-col': $props.orientation === 'vertical' }"
        class="relative rounded-lg p-1 inline-flex shrink-0 w-full bg-gray-100"
      >
        <TabsIndicator
          :class="{
            'top-1 left-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position]':
              $props.orientation === 'horizontal',
            'top-0 left-1 w-[calc(100%-8px)] translate-y-[--radix-tabs-indicator-position]':
              $props.orientation === 'vertical'
          }"
          class="z-0 absolute rounded-md py-1 bg-white shadow-sm transition-[width_transform] duration-200"
        >
          <span class="opacity-0">0</span>
        </TabsIndicator>
        <TabsTrigger
          v-for="(item, index) of $props.items"
          :key="index"
          :value="item.label"
          class="z-10 group px-2.5 py-1 w-full"
        >
          <span
            class="text-gray-500 group-data-[state=active]:text-black font-medium truncate transition-colors duration-200"
          >
            {{ item.label }}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="(item, index) of $props.items"
        :key="index"
        :value="item.label"
      >
        <slot :name="item.label" />
      </TabsContent>
    </TabsRoot>
  </ConfigProvider>
</template>
