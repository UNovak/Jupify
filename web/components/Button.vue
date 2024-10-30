<script setup lang="ts">
import { cva, type VariantProps } from 'cva'

const props = defineProps({
  isActive: Boolean,
  loading: Boolean,
  as: {
    type: [String, Object],
    default: 'button',
  },
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'navLink'>,
    default: 'primary',
  },
})

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center font-primary text-center text-white',
    {
      variants: {
        variant: {
          primary:'bg-primary h-[60px] rounded-[30px] px-6 py-4 text-xl font-semibold hover:bg-primary/50 active:bg-primary/30 focus:outline-none focus:text-white/70',
          secondary:'min-w-[100px] rounded-full bg-secondary px-4 py-2 text-lg font-medium h-10 hover:bg-secondary/50 active:bg-secondary/30 focus:outline-none focus:text-white/70',
          navLink: 'min-w-[115px] h-10 rounded-full px-6 py-4 text-lg font-medium h-10 hover:bg-secondary/50 focus:outline-none focus:text-white focus:bg-transperent focus:ring-2 focus:ring-white/40',
        },
      },
    },
  )({
    variant: props.variant,
  })
})
</script>

<template>
  <template v-if="props.variant === 'navLink'">
    <a :class="[buttonClass, isActive ? 'bg-secondary' : 'bg-transparent']">
      <slot />
    </a>
  </template>

  <template v-else>
    <component :is="props.as" :class="buttonClass">
      <span :class="[props.loading && 'invisible']">
        <slot />
      </span>

      <!-- Loader Component -->
      <span v-if="props.loading" class="absolute"> ... </span>
    </component>
  </template>
</template>
