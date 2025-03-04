<template>
  <footer
    class="font-primary fixed bottom-0 left-0 flex h-[100px] w-full items-center justify-end gap-6 bg-transparent py-5 pr-10 text-xl font-semibold text-white">
    <NuxtLink
      to="https://github.com/UNovak/Jupify"
      class="hover:text-white/40"
      external
      target="_blank">
      <nuxt-icon name="github" class="text-3xl" />
    </NuxtLink>
    <NuxtLink
      to="https://buymeacoffee.com/"
      class="hover:text-white/40"
      external
      target="_blank">
      <nuxt-icon name="coffee" class="text-3xl" />
    </NuxtLink>
  </footer>
</template>
