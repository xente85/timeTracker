<template>
  <div class="relative" v-click-outside="onClickOutside">
    <div class="account flex items-center justify-center hover:bg-gray-200 rounded-full p-1 cursor-pointer" :class="showMenu ? ['bg-gray-200'] : ['']" @click="toggleMenu">
      <div class="relative w-10 h-10 mx-2">
        <img class="rounded-full border border-gray-100 shadow-sm" :src="employee.imageProfileURL" :alt="`user image ${employeeName}`" />
        <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
      </div>
      <div class="font-bold mx-2">
        {{ employeeName }}
      </div>
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
    <ul v-show="showMenu" class="absolute right-0 bg-white shadow rounded-t rounded-b text-center mt-1">
      <li class="relative">
        <svg class="absolute left-1 top-2.5 fill-current h-4 w-4 inline rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        <a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#" @click="toggleSubMenu">
          Mis cuentas
        </a>
        <ul v-show="showSubMenu" class="absolute bg-white shadow rounded-t rounded-b text-center mt-1" style="top: -4px; left: -115px">
          <li><a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#">Sub menu 1</a></li>
          <li><a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#">Sub menu 3</a></li>
        </ul>
      </li>
      <li><a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#">Vista empleado</a></li>
      <li><a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#">Mi perfil</a></li>
      <li><a class="hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#">Cerrar sesión</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { Employee } from '../interfaces'
import { vClickOutside } from '../directives'

interface Props {
  employee: Employee
}

const props = withDefaults(defineProps<Props>(), {})

const employeeName = computed(() => `${props.employee.firstName} ${props.employee.lastName}`)

const showMenu = ref<boolean>(false)
const showSubMenu = ref<boolean>(false)

function toggleMenu()
{
  showMenu.value = !showMenu.value

  if (!showMenu.value) showSubMenu.value = false
}

function toggleSubMenu()
{
  showSubMenu.value = !showSubMenu.value
}

function onClickOutside()
{
  showMenu.value = false
  showSubMenu.value = false
}
</script>