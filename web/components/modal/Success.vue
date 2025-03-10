<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  email: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'resend'])

const resend = () => {
  console.log('resensding verification email to: ', props.email)
}
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
      <h2 class="mb-6 text-3xl font-bold">One last step</h2>

      <div class="mb-6 text-white/90">
        An email has been sent to {{ props.email }}. Follow the instructions to
        verify your subscription. If you can't find it resend it by clicking
        <button class="text-primary hover:text-gray-600">HERE</button>.
      </div>

      <Button
        variant="secondary"
        @click="$emit('close')"
        class="rounded-md px-4 py-2 text-lg font-medium">
        Ok
      </Button>
    </div>
  </div>
</template>
