<script setup lang="ts">
const email = ref('')
const submitting = ref(false)

const subscribe = async () => {

  submitting.value = true

  try {
    const { status, error } = await $fetch('http://localhost:4000/subscribers', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })

    console.log('status: ', status)
    console.log('error: ', error)

  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => {
      submitting.value = false
    }, 200)
  }
}
</script>

<template>
  <form class="flex flex-col items-center gap-8" @submit.prevent="subscribe">
    <div class="inline-flex justify-center gap-5">
      <Input
        isRequired
        v-model:model-value="email"
        type="email"
        placeholder="Your email" />
      <Button :loading="submitting" :disabled="submitting">Notify me</Button>
    </div>
    <span
      class="font-primary w-1/2 text-center text-base leading-normal text-white/40">
      Disclaimer: I can’t guarantee 100% accuracy. Please use this as a helpful
      reminder rather than your only source for vote tracking.
    </span>
    <span class="text-base leading-5 text-white/40">
      By signing up, you agree to the Terms of Service
    </span>
  </form>
</template>
