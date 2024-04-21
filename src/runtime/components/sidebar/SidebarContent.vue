<script setup lang="ts">
import { useId } from '#app'
import { inject } from '#imports'

interface SidebarItem {
  icon: string
  label: string
  to?: string
  items?: SidebarSubItem[]
}

interface SidebarSubItem {
  label: string
  to: string
}

defineProps<{
  title?: string
  items: SidebarItem[]
}>()

const isParentOpen = inject<boolean>('isOpen')

const useIdProvider = () => useId()
</script>

<template>
  <nav aria-label="sidebar-content">
    <h3
      v-if="$props.title"
      :class="{ 'opacity-0': !isParentOpen }"
      class="mb-4 text-gray-500 transition-opacity"
    >
      {{ $props.title }}
    </h3>
    <ul class="space-y-3">
      <li v-for="item in $props.items" :key="item.label" class="flex">
        <ConfigProvider
          v-if="item.items && item.items.length > 0"
          :useId="useIdProvider"
        >
          <AccordionRoot type="single" collapsible class="w-full">
            <AccordionItem
              :value="item.label"
              :disabled="!isParentOpen"
              :class="{ 'pointer-events-none': !isParentOpen }"
              class="w-full"
            >
              <AccordionHeader class="w-full">
                <AccordionTrigger
                  class="group relative inline-flex items-center justify-between p-2 rounded-md w-full h-[37px] bg-white text-gray-500 hover:text-black transition-colors"
                >
                  <div class="flex items-center bg-white">
                    <Icon
                      :name="item.icon"
                      class="absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5 bg-inherit z-10"
                    />
                    <Transition
                      enter-active-class="transition-[transform_opacity] duration-200"
                      leave-active-class="transition-[transform_opacity] duration-200"
                      enter-from-class="-translate-x-4 opacity-0"
                      leave-to-class="-translate-x-4 opacity-0"
                    >
                      <span v-if="isParentOpen" class="ml-8">
                        {{ item.label }}
                      </span>
                    </Transition>
                  </div>
                  <Icon
                    name="lucide:chevron-down"
                    :class="{
                      'opacity-0': !isParentOpen
                    }"
                    class="w-4 h-4 text-gray-500 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
                  />
                </AccordionTrigger>
              </AccordionHeader>
              <Transition
                enter-active-class="transition-[height] duration-200"
                leave-active-class="transition-[height] duration-200"
                enter-from-class="h-0"
                leave-to-class="h-0"
              >
                <AccordionContent
                  v-if="isParentOpen"
                  class="overflow-hidden data-[state=open]:animate-accordionSlideDown data-[state=closed]:animate-accordionSlideUp"
                >
                  <ul class="relative space-y-2">
                    <div
                      class="absolute top-0 left-[18px] rounded-full w-0.5 h-full bg-gray-200"
                    />
                    <li v-for="subItem in item.items" :key="subItem.label">
                      <NuxtLink
                        :to="subItem.to"
                        class="inline-flex items-center ml-7 px-3 py-2 rounded-md w-[calc(100%-28px)] space-x-2 text-gray-500 hover:text-black transition-colors"
                      >
                        <span> {{ subItem.label }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </AccordionContent>
              </Transition>
            </AccordionItem>
          </AccordionRoot>
        </ConfigProvider>
        <NuxtLink
          v-else-if="item.to"
          :to="item.to"
          class="relative inline-flex items-center p-2 rounded-md w-full min-h-[37px] bg-white text-gray-500 hover:text-black transition-colors"
        >
          <Icon
            :name="item.icon"
            class="absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5 bg-inherit z-10"
          />
          <Transition
            enter-active-class="transition-[transform_opacity] duration-200"
            leave-active-class="transition-[transform_opacity] duration-200"
            enter-from-class="-translate-x-4 opacity-0"
            leave-to-class="-translate-x-4 opacity-0"
          >
            <span v-if="isParentOpen" class="ml-8">
              {{ item.label }}
            </span>
          </Transition>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
nav[aria-label='sidebar-content'] .router-link-active {
  @apply bg-gray-100 text-black;
}
</style>
