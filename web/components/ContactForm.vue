<script setup lang="ts">
const data = ref({
  message: '',
  sender: '',
})

const subscribe = () => {
  console.log(data.value.message)
  console.log(data.value.sender)
  // submit form here
}
</script>

<template>
  <form
    class="flex w-1/2 flex-col items-center gap-5"
    @submit.prevent="subscribe">
    <Input
      variant="textarea"
      v-model:model-value="data.message"
      type="textarea"
      placeholder="Your message" />

    <div class="inline-flex justify-center gap-5">
      <Input
        v-model:model-value="data.sender"
        type="email"
        placeholder="Your email"
        :isRequired="true" />
      <Button>Send</Button>
    </div>
  </form>
</template>
