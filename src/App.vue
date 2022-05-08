<template>
  <div class="container mx-auto text-sm text-gray-600">
    <div class="h-56 flex items-center justify-center">
      <ToolbarTimerVue :employee="employee" :loading="loading" @clockIn="onClockIn" @clockPause="onClockPause" @clockOut="onClockOut"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Employee } from './interfaces'
import { getDataEmployee, clockIn, clockOut } from './services/api'
import ToolbarTimerVue from './components/ToolbarTimer.vue'

const employeeId = <string>import.meta.env.VITE_EMPLOYEE_ID
const employee = ref<Employee | null>(null)
const loading = ref<boolean>(true)

ready()

async function ready()
{
  loading.value = true
  employee.value = await getDataEmployee(employeeId)
  loading.value = false
}

async function onClockIn({ employeeId }:{ employeeId: string })
{
  loading.value = true
  employee.value = await clockIn(employeeId)
  loading.value = false
}

function onClockPause({ employeeId }:{ employeeId: string })
{
  console.log('onClockPause', employeeId)
}

async function onClockOut({ employeeId }:{ employeeId: string })
{
  loading.value = true
  employee.value = await clockOut(employeeId)
  loading.value = false
}
</script>