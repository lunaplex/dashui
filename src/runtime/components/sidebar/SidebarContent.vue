<script setup lang="ts">
import { useId } from '#app'
import { inject } from '#imports'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  provideUseId
} from '@headlessui/vue'

provideUseId(() => useId())

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

const onEnter = (_el: Element, done: () => void) => {
  const el = _el as HTMLElement
  el.style.height = '0'
  el.offsetHeight
  el.style.height = el.scrollHeight + 'px'

  el.addEventListener('transitionend', done, { once: true })
}

const onBeforeLeave = (_el: Element) => {
  const el = _el as HTMLElement
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight
}

const onAfterEnter = (_el: Element) => {
  const el = _el as HTMLElement
  el.style.height = 'auto'
}

const onLeave = (_el: Element, done: () => void) => {
  const el = _el as HTMLElement
  el.style.height = '0'

  el.addEventListener('transitionend', done, { once: true })
}

const isParentOpen = inject<boolean>('isOpen')
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
      <li v-for="item in $props.items" class="flex">
        <Disclosure
          v-if="item.items && item.items.length > 0"
          v-slot="{ open }"
        >
          <div class="w-full">
            <DisclosureButton
              :disabled="!isParentOpen"
              :class="{ 'pointer-events-none': !isParentOpen }"
              class="relative inline-flex items-center justify-between p-2 rounded-md w-full h-[37px] bg-white text-gray-500 hover:text-black transition-colors"
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
                  'transform rotate-180': open,
                  'opacity-0': !isParentOpen
                }"
                class="w-4 h-4 text-gray-500 transition-transform duration-200 ease-out"
              />
            </DisclosureButton>
            <Transition
              @enter="onEnter"
              @after-enter="onAfterEnter"
              @before-leave="onBeforeLeave"
              @leave="onLeave"
            >
              <DisclosurePanel
                v-if="isParentOpen"
                class="overflow-hidden transition-[height] duration-200 ease-out"
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
              </DisclosurePanel>
            </Transition>
          </div>
        </Disclosure>
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
