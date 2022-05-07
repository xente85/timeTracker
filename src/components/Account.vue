<template>
  <div class="account flex items-center justify-center hover:bg-gray-200 rounded-full p-1 cursor-pointer" @click="menu">
    <div class="relative w-10 h-10 mx-2">
      <img class="rounded-full border border-gray-100 shadow-sm" :src="account.src" :alt="`user image ${account.name}`" />
      <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
    </div>
    <div class="font-bold mx-2">
      {{ account.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Account } from '../interfaces'

interface Props {
  account: Account
  menu: any
}

const props = withDefaults(defineProps<Props>(), {})

function menu()
{
  console.log('menu')
}
</script>