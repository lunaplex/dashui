<script setup lang="ts">
const search = ref('')
const items = ref([
  {
    icon: 'solar:home-angle-linear',
    label: 'Dashboard',
    to: '/'
  },
  {
    icon: 'solar:graph-linear',
    label: 'Analytics',
    items: [
      {
        label: 'Overview',
        to: '/analytics-overview'
      },
      {
        label: 'Reports',
        to: '/analytics-reports'
      }
    ]
  },
  {
    icon: 'solar:settings-linear',
    label: 'Settings',
    to: '/settings'
  }
])
</script>

<template>
  <div class="flex">
    <Sidebar v-slot="{ open }">
      <SidebarHeader>
        <NuxtLink
          to="/"
          class="relative inline-flex items-center w-full h-8 font-bold"
        >
          <img
            src="/lunaplex.svg"
            alt="LunaPlex"
            class="absolute top-1/2 -translate-y-1/2 w-8 h-8"
          />
          <span v-if="open" class="ml-12 text-2xl">DashUI</span>
        </NuxtLink>
      </SidebarHeader>
      <SidebarContent title="Workspace" :items="items" />
      <SidebarFooter>
        <ProfileCard
          avatarUrl="https://i.pravatar.cc/300"
          name="John Doe"
          details="Software Engineer"
        />
      </SidebarFooter>
    </Sidebar>
    <div>
      <div class="px-6 py-4 w-full h-16">
        <TextInput v-model="search" placeholder="Search..." />
      </div>
      <div class="px-6">
        <slot />
      </div>
    </div>
  </div>
</template>
