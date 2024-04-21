<template>
  <PopoverRoot>
    <PopoverTrigger asChild>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <Transition
        enter-active-class="transition-opacity"
        leave-active-class="transition-opacity"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <PopoverContent
          :sideOffset="5"
          class="z-10 data-[state=open]:data-[side=top]:animate-selectSlideUp data-[state=open]:data-[side=bottom]:animate-selectSlideDown"
        >
          <slot />
        </PopoverContent>
      </Transition>
    </PopoverPortal>
  </PopoverRoot>
</template>
