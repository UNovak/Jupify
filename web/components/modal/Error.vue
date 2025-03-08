<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const emit =  defineEmits(['close'])
</script>

<template>
  <div
    class="relative w-full max-w-screen-sm rounded-lg bg-indigo-950 text-white shadow"
    @click.stop>
    <!-- Close button -->
    <button
      type="button"
      @click="$emit('close')"
      class="absolute end-2.5 top-3 ms-auto inline-flex items-center justify-center rounded-lg bg-transparent text-white/70 transition-colors hover:text-white">
      <nuxt-icon name="close" class="text-xl" />
      <span class="sr-only">Close modal</span>
    </button>

    <!-- Content -->
    <div class="flex flex-col items-center p-6 text-center">
      <h2 class="mb-6 text-3xl font-bold">Yikes</h2>

      <p class="mb-6 text-white/90">
        It looks like there was an issue attempting to subscribe. You should try
        again later or try with a different email.
      </p>

      <Button
        variant="secondary"
        @click="$emit('close')"
        class="rounded-md px-8 font-medium transition-colors">
        Ok
      </Button>
    </div>
  </div>
</template>
