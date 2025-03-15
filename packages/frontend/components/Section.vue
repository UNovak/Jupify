<template>
  <div
    class="flex min-h-screen w-full flex-col items-center justify-center gap-24">
    <div class="flex flex-col gap-10">
      <h1
        class="font-secondary leading-title whitespace-pre text-center text-7xl font-bold text-white">
        <slot name="title" />
      </h1>
      <p
        class="font-secondary text-normal whitespace-pre text-center leading-8 text-white">
        <slot name="description" />
      </p>
    </div>
    <slot />
  </div>
</template>
