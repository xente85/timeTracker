<template>
  <div class="container mx-auto text-sm text-gray-600">
    <div class="h-56 flex items-center justify-center">
      <div class="rounded-full bg-gray-100 flex items-center justify-center py-2 px-5">
        <TimeTrackerVue v-model="timer" :id="account.id" :maxTime="maxTime" :active="active" @entrar="entrar" @pausar="pausar" @salir="salir" />
        <div class="bg-gray-300 w-0.5 mx-4 py-4"></div>
        <AccountVue :account="account" :menu="menu"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeTrackerVue from './components/TimeTracker.vue'
import AccountVue from './components/Account.vue'
import { ref } from 'vue'
import { Account } from './interfaces'
import { getData, clockIn, clockOut } from './services/api'

const timer = ref<Date | null>(null)
const maxTime = ref<string | null>(null)
const active = ref<boolean>(false)
const account = ref<Account>({
  id: 'b99a6cd9-3a3d-4635-9eea-e089c90ac45a',
  name: 'Vicente Álvaro',
  src: 'https://randomuser.me/api/portraits/men/81.jpg'
})
const menu = ref<any>(null)

ready()

async function ready()
{
  const data = await getData(account.value.id)
  timer.value = data.timer
  active.value = data.active
  maxTime.value = data.maxTime
}

async function entrar({ id }:{ id: string })
{
  active.value = true

  const data = await clockIn(id)
  timer.value = data.timer
  active.value = data.active
  maxTime.value = data.maxTime
}

function pausar({ id }:{ id: string })
{
  console.log('pausar', id)
}

async function salir({ id }:{ id: string })
{
  active.value = false

  const data = await clockOut(id)
  timer.value = data.timer
  active.value = data.active
  maxTime.value = data.maxTime
}
</script>