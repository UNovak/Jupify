<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  type: { type: String, default: 'text' },
  aria: { type: String, default: 'input field' },
  modelValue: { type: [String, Number, null], default: null },
  variant: { type: String, default: 'text' },
  placeholder: String,
  isRequired: Boolean,
})

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="props.type"
    class="h-[60px] w-[350px] appearance-none rounded-[100px] border-2 border-white/20 bg-transparent py-2 pl-8 align-middle text-xl leading-normal text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="updateValue"
    :required="props.isRequired"
    :aria-label="props.aria" />
</template>
