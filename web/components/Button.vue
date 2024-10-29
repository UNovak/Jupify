<script setup lang="ts">
import { cva, type VariantProps } from 'cva'

const props = defineProps({
  loading: Boolean,
  as: {
    type: [String, Object],
    default: 'button',
  },
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary',
  },
})

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center font-primary  text-center',
    {
      variants: {
        variant: {
          primary: 'bg-primary h-[60px] rounded-[30px] px-6 py-4 text-xl font-semibold text-white hover:bg-primary/50 active:bg-primary/30 focus:outline-none focus:text-white/70',
          secondary: 'min-w-[100px] rounded-full bg-secondary px-4 py-2 text-lg font-medium text-white h-10 hover:bg-secondary/50 active:bg-secondary/30 focus:outline-none focus:text-white/70',
        },
      },
    },
  )({
    variant: props.variant,
  })
})
</script>

<template>
  <component :is="props.as" :class="buttonClass">
    <span :class="[props.loading && 'invisible']">
      <slot />
    </span>

    <!-- <Loader> -->
    <span v-if="loading" class="absolute">
        ...
    </span>
  </component>
</template>
