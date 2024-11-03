<script setup lang="ts">
import { cva, type VariantProps } from 'cva'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  type: { type: String, default: 'text' },
  aria: { type: String, default: 'input field' },
  modelValue: { type: [String, Number, null], default: null },
  variant: {
    type: String as PropType<'text' | 'textarea'>,
    default: 'text',
  },
  placeholder: String,
  isRequired: Boolean,
})

const inputClass = computed(() => {
  return cva(
    'appearance-none border-2 border-white/20 bg-transparent text-xl leading-normal text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40',
    {
      variants: {
        variant: {
          textarea: 'block w-3/4 rounded-[30px] p-6',
          text: 'h-[60px] w-[350px] rounded-[100px] py-2 pl-8 align-middle ',
        },
      },
    },
  )({
    variant: props.variant,
  })
})

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <template v-if="props.variant === 'textarea'">
    <textarea
      rows="6"
      :class="inputClass"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="updateValue"
      :required="props.isRequired"
      :aria-label="props.aria" />
  </template>

  <template v-else>
    <input
      :type="props.type"
      :class="inputClass"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="updateValue"
      :required="props.isRequired"
      :aria-label="props.aria" />
  </template>
</template>
