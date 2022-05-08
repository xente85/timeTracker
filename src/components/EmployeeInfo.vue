<template>
  <div class="account flex items-center justify-center hover:bg-gray-200 rounded-full p-1 cursor-pointer" @click="menu">
    <div class="relative w-10 h-10 mx-2">
      <img class="rounded-full border border-gray-100 shadow-sm" :src="employee.imageProfileURL" :alt="`user image ${employeeName}`" />
      <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
    </div>
    <div class="font-bold mx-2">
      {{ employeeName }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { Employee } from '../interfaces'

interface Props {
  employee: Employee
}

const props = withDefaults(defineProps<Props>(), {})

const employeeName = computed(() => `${props.employee.firstName} ${props.employee.lastName}`)

function menu()
{
  console.log('menu')
}
</script>