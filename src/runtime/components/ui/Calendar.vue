<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date'

const value = defineModel<DateValue | null>({
  required: true
})

withDefaults(
  defineProps<{
    locale?: string
    weekday?: 'narrow' | 'short'
    isDateUnavailable?: (date: any) => boolean
  }>(),
  {
    locale: 'en',
    weekday: 'narrow',
    isDateUnavailable: () => false
  }
)
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid, date }"
    :locale="$props.locale"
    :is-date-unavailable="isDateUnavailable"
    :weekdayFormat="$props.weekday"
    fixed-weeks
    class="ring-1 ring-gray-200 rounded-lg p-3 w-fit bg-white"
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev
        class="flex items-center justify-center ring-1 ring-gray-200 rounded-md w-8 h-8 hover:bg-gray-50 transition-colors"
      >
        <Icon name="lucide:chevron-left" class="w-4 h-4" />
      </CalendarPrev>
      <CalendarHeading class="font-semibold capitalize" />
      <CalendarNext
        class="flex items-center justify-center ring-1 ring-gray-200 rounded-md w-8 h-8 hover:bg-gray-50 transition-colors"
      >
        <Icon name="lucide:chevron-right" class="w-4 h-4" />
      </CalendarNext>
    </CalendarHeader>
    <div class="mt-4">
      <CalendarGrid v-for="month of grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow class="mb-2 flex">
            <CalendarHeadCell
              v-for="day of weekDays"
              :key="day"
              class="w-9 text-gray-500 font-normal capitalize"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) of month.rows"
            :key="index"
            class="flex w-full"
          >
            <CalendarCell
              v-for="weekDate of weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="p-0"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                @click="
                  () =>
                    (value = new CalendarDate(
                      weekDate.year,
                      weekDate.month,
                      weekDate.day
                    ))
                "
                class="relative flex items-center justify-center rounded-md w-9 h-9 select-none hover:bg-gray-100 data-[selected=true]:bg-gray-700 data-[selected=true]:text-white data-[disabled]:text-gray-400 data-[unavailable]:text-gray-400 data-[unavailable]:after:absolute data-[unavailable]:after:content-[''] data-[unavailable]:after:w-full data-[unavailable]:after:h-[1px] data-[unavailable]:after:bg-gray-400 data-[unavailable]:pointer-events-none font-medium transition-colors"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
