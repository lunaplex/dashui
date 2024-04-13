<script setup lang="ts">
const progress = ref(72)
</script>

<template>
  <div>
    <Callout
      icon="solar:bug-linear"
      title="Critical speed limit reached"
      color="red"
      class="mb-6"
    >
      <p class="text-inherit">
        Turbine reached critical speed. Immediately reduce turbine speed.
      </p>
    </Callout>
    <div class="space-x-4">
      <Card>
        <div class="relative w-full">
          <p class="mb-2 text-gray-500 leading-none">Sales</p>
          <h3 class="text-3xl font-bold leading-none">$23,456</h3>
          <Badge
            icon="solar:arrow-right-up-linear"
            color="emerald"
            rounded
            class="absolute top-0 right-0"
          >
            <span class="text-xs font-medium">+8.4%</span>
          </Badge>
        </div>
        <AreaChart
          :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
          :data="[
            {
              label: 'Sales',
              values: [4000, 3600, 1200, 4000, 3900, 8000, 10000],
              color: 'emerald'
            }
          ]"
          class="mt-4 w-64 h-20"
        />
      </Card>
      <Card>
        <div class="relative w-full">
          <p class="mb-2 text-gray-500 leading-none">Sessions</p>
          <h3 class="text-3xl font-bold leading-none">134</h3>
          <Badge
            icon="solar:arrow-right-down-linear"
            color="red"
            rounded
            class="absolute top-0 right-0"
          >
            <span class="text-xs font-medium">-11.2%</span>
          </Badge>
        </div>
        <BarChart
          :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
          :data="[
            {
              label: 'Sessions',
              values: [2400, 1400, 740, 280, 250, 230, 90],
              color: 'blue'
            }
          ]"
          class="mt-4 w-64 h-20"
        />
      </Card>
      <Card>
        <div class="relative w-full">
          <p class="mb-2 text-gray-500 leading-none">Pull Requests</p>
          <h3 class="text-3xl font-bold leading-none">51</h3>
          <Badge
            icon="solar:arrow-right-linear"
            color="gray"
            rounded
            class="absolute top-0 right-0"
          >
            <span class="text-xs font-medium">+0.4%</span>
          </Badge>
        </div>
        <LineChart
          :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
          :data="[
            {
              label: 'Pull Requests',
              values: [45, 61, 52, 60, 64, 58, 46],
              color: 'yellow'
            }
          ]"
          class="mt-4 w-64 h-20"
        />
      </Card>
    </div>
    <span>
      Progress {{ progress }}%
    </span>
    <ProgressBar v-model="progress" color="emerald" class="w-64" />
  </div>
</template>
