<template>
  <div class="rounded-full bg-gray-100 flex items-center justify-center py-2 px-5 relative">
    <template v-if="employee">
      <TimeTrackerVue
        :loading="loading"
        :time="employee.totalWorkTime"
        :maxTime="employee.maxWorkTime"
        :active="employee.workStatus === 'online'"
        @clockIn="onClockIn"
        @clockPause="onClockPause"
        @clockOut="onClockOut"
      />
      <div class="bg-gray-300 w-0.5 mx-4 py-4"></div>
      <EmployeeInfoVue :employee="employee"/>
    </template>
    <template v-else>
      <p class="italic mx-4 py-4">No data</p>
    </template>
    <div v-show="loading" class="rounded-full absolute font-bold bg-gray-100 bg-opacity-80 w-full h-full flex items-center justify-center">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeTrackerVue from './TimeTracker.vue'
import EmployeeInfoVue from './EmployeeInfo.vue'
import { Employee } from '../interfaces'

interface Props {
  employee: Employee | null
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'clockIn', { employeeId }:{ employeeId: string }): void
	(e: 'clockPause', { employeeId }:{ employeeId: string }): void
  (e: 'clockOut', { employeeId }:{ employeeId: string }): void
}>()

function onClockIn()
{
  if (props.employee) emit('clockIn', { employeeId: props.employee.id })
}

function onClockPause()
{
  if (props.employee) emit('clockPause', { employeeId: props.employee.id })
}

async function onClockOut()
{
  if (props.employee) emit('clockOut', { employeeId: props.employee.id })
}

</script>