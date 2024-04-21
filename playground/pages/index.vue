<script setup lang="ts">
import { capitalize } from 'vue'
import { format } from '@formkit/tempo'
import {
  type DateValue,
  getLocalTimeZone,
  today
} from '@internationalized/date'

const circleProgress = ref(20)
const barProgress = ref(18.5)
const tabItems = ref([
  {
    label: 'Account',
    icon: 'heroicons:user'
  },
  {
    label: 'Password',
    icon: 'heroicons:key'
  }
])
const trackerData = ref<TrackerData[]>([
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Downtime' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Downtime' },
  { color: 'gray', tooltip: 'Downtime' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Downtime' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Downtime' },
  { color: 'gray', tooltip: 'Downtime' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'blue', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gray', tooltip: 'Maintenance' }
])
const datePickerValue = ref(today(getLocalTimeZone())) as Ref<DateValue>
const password = ref('')
const number = ref(0)
const checked = ref(false)
const selected = ref('')
const selectedMultiple = ref<string[]>([])
const text = ref('')
</script>

<template>
  <div class="pb-10">
    <Callout
      icon="lucide:bug"
      title="Critical speed limit reached"
      color="red"
      class="mb-6"
    >
      <p class="text-inherit">
        Turbine reached critical speed. Immediately reduce turbine speed.
      </p>
    </Callout>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div class="relative w-full">
          <p class="mb-2 text-gray-500 leading-none">Storage used</p>
          <h3 class="text-xl font-bold leading-none">1.85GB</h3>
        </div>
        <div class="flex items-end mt-4 h-14">
          <div class="w-full">
            <div class="flex justify-between">
              <span class="text-gray-500">{{ barProgress }}%</span>
              <span class="text-gray-500">1.85 of 10GB</span>
            </div>
            <ProgressBar
              v-model="barProgress"
              color="blue"
              class="mt-2 w-full"
            />
          </div>
        </div>
      </Card>
      <Card>
        <div class="relative w-full">
          <p class="mb-2 text-gray-500 leading-none">Acme Holding</p>
          <h3 class="text-xl font-bold leading-none">$45.1K</h3>
          <Badge
            icon="lucide:arrow-up-right"
            color="blue"
            class="absolute top-0 right-0"
          >
            <span class="text-xs font-semibold">+9.1%</span>
          </Badge>
        </div>
        <AreaChart
          :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
          :data="[
            {
              label: 'Sales',
              values: [4211, 3389, 2660, 3570, 4056, 5124],
              color: 'blue'
            }
          ]"
          :tooltip="false"
          class="mt-4 w-full h-14"
        />
      </Card>
      <Card class="flex items-center justify-center space-x-5">
        <ProgressCircle v-model="circleProgress" :radius="32">
          <span class="text-xs font-medium">{{ circleProgress }}%</span>
        </ProgressCircle>
        <div class="space-y-1">
          <p class="font-semibold leading-none">Data Workspaces</p>
          <p class="text-gray-500">1 of 5 used</p>
        </div>
      </Card>
    </div>
    <Tabs :items="tabItems" class="mt-6 w-full">
      <template #Account>
        <div class="ring-1 ring-gray-200 rounded-lg p-4 mt-4">
          <Tooltip text="cacacacaca">
            <p class="inline-flex text-base font-bold">Account</p>
          </Tooltip>
          <p class="mt-1 text-gray-500">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </template>
      <template #Password>
        <div class="ring-1 ring-gray-200 rounded-lg p-4 mt-4">
          <p class="inline-flex text-base font-bold">Password</p>
          <p class="mt-1 text-gray-500">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </template>
    </Tabs>
    <Card class="w-[524px] mt-6">
      <div class="flex justify-between">
        <div class="flex space-x-2">
          <Icon name="lucide:hard-drive" class="w-5 h-5 text-gray-500" />
          <p class="font-semibold">example.com</p>
        </div>
        <p class="text-gray-500">uptime 99.1%</p>
      </div>
      <Tracker :data="trackerData" class="mt-2 w-full h-10" />
    </Card>
    <Popover>
      <template #trigger>
        <Button input class="mt-6 w-64">
          <Icon name="lucide:calendar-days" class="w-4 h-4 mr-1.5" />
          <span class="font-medium">
            {{ capitalize(format(datePickerValue.toString(), 'full')) }}
          </span>
        </Button>
      </template>
      <Calendar
        v-model="datePickerValue"
        locale="fr"
        :isDateUnavailable="(date) => date.day >= 20 && date.day <= 24"
      />
    </Popover>
    <div>
      <TextInput
        v-model="password"
        type="password"
        placeholder="Type password here"
        class="mt-6 w-[300px]"
      />
    </div>
    <div>
      <NumberInput v-model="number" class="mt-6 w-[300px]" />
    </div>
    <div>
      <Switch v-model="checked" class="mt-6" />
    </div>
    <div>
      <Select
        v-model="selected"
        :options="[
          { label: 'Option 1' },
          { label: 'Option 2' },
          { label: 'Option 3' }
        ]"
        class="mt-6 w-[300px]"
      />
    </div>
    <div>
      <Select
        v-model="selected"
        :options="[
          { label: 'Option 1' },
          { label: 'Option 2' },
          { label: 'Option 3' }
        ]"
        searchable
        class="mt-6 w-[300px]"
      />
    </div>
    <div>
      <Select
        v-model="selectedMultiple"
        :options="[
          { label: 'Option 1' },
          { label: 'Option 2' },
          { label: 'Option 3' }
        ]"
        multiple
        class="mt-6 w-[300px]"
      />
    </div>
    <div>
      <Textarea
        v-model="text"
        placeholder="Type here..."
        class="mt-6 w-[300px]"
      />
    </div>
  </div>
</template>
