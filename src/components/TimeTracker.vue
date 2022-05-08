<template>
  <div class="flex items-center justify-center">
    <div class="time">
      <span>{{ localTimeStr }}</span> / <span class="font-light">{{ maxTime }}</span>
    </div>
    <div class="actions flex ml-5">
      <template v-if="!active">
        <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="onClockIn" :disabled="loading">
          Entrar
        </button>
      </template>
      <template v-else>
        <button class="bg-teal-400 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="onClockPause" :disabled="loading">
          Pausar
        </button>
        <button class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="onClockOut" :disabled="loading">
          Salir
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { watch } from 'vue'

interface Props {
  time: Date
  maxTime: string
  active: boolean
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const localTimer = ref<Date>(props.time)
let counter: number | null = null

const localTimeStr = computed(() => localTimer.value.toTimeString().split(' ')[ 0 ])

watch(() => props.time, () => localTimer.value = props.time)
watch(() => props.active, () => checkSataus())

const emit = defineEmits<{
  (e: 'clockIn'): void
	(e: 'clockPause'): void
  (e: 'clockOut'): void
}>()

checkSataus()

function checkSataus()
{
  if (!props.active)
  {
    stopTimer()
    return
  }

  startTimer()
}

function startTimer()
{
  counter = setInterval(sum1sec, 1000)
}

function stopTimer()
{
  if (counter !== null) clearInterval(counter)
}

function sum1sec()
{
  localTimer.value = new Date(localTimer.value.getTime() + 1000)
}

function onClockIn()
{
  emit('clockIn')
}

function onClockPause()
{
  emit('clockPause')
}

function onClockOut()
{
  emit('clockOut')
}
</script>
