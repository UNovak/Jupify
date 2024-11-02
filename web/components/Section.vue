<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1
      class="font-secondary leading-title whitespace-pre pb-8 text-center text-7xl font-bold text-white">
      <slot name="title" />
    </h1>
    <p
      class="font-secondary text-normal whitespace-pre pb-20 text-center leading-8 text-white">
      <slot name="description" />
    </p>
    <slot />
  </div>
</template>
