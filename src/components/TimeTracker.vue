<template>
  <div class="flex items-center justify-center">
    <div v-if="!modelValue || !maxTime" class="time italic">No data</div>
    <template v-else>
      <div class="time">
        <span>{{ totalTime }}</span> / <span class="font-light">{{ maxTime }}</span>
      </div>
      <div class="actions flex ml-5">
        <template v-if="!active">
          <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="entrar">
            Entrar
          </button>
        </template>
        <template v-else>
          <button class="bg-teal-400 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="pausar">
            Pausar
          </button>
          <button class="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded-full mx-1" @click="salir">
            Salir
          </button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { watch } from 'vue'

interface Props {
  modelValue: Date | null
  id: string,
  maxTime: string | null
  active: boolean
}

const props = withDefaults(defineProps<Props>(), {})
let counter: number | null = null

const emit = defineEmits<{
  (e: 'update:modelValue', timer: Date): void
  (e: 'entrar', { id }:{ id: string }): void
	(e: 'pausar', { id }:{ id: string }): void
  (e: 'salir', { id }:{ id: string }): void
}>()

checkSataus()

watch(() => props.active, () => checkSataus())

const totalTime = computed(() =>
{
  if (!props.modelValue) return ''
  return props.modelValue.toTimeString().split(' ')[ 0 ]
})

function checkSataus()
{
  if (props.active)
  {
    startTimer()
  }
  else
  {
    stopTimer()
  }
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
  if (props.modelValue !== null)
  {
    updateTimer(new Date(props.modelValue.getTime() + 1000))
  }
}

function updateTimer(timer: Date)
{
  emit('update:modelValue', timer)
}

function entrar()
{
  emit('entrar', { id: props.id })
}

function pausar()
{
  emit('pausar', { id: props.id })
}

function salir()
{
  emit('salir', { id: props.id })
}
</script>
