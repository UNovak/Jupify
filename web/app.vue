<script setup lang="ts">
useHead({
  title: 'Jupify',
  meta: [{ name: 'description', content: 'Jupify landing page' }],
})
</script>

<template>
  <div class="from-grad-start to-grad-end min-h-screen w-full bg-gradient-to-r">
    <Navbar />
    <div class="flex min-h-[calc(100vh-160px)] w-full flex-col items-center">
      <NuxtPage />
      <div id="modal" />
    </div>
    <Footer />
  </div>
</template>
