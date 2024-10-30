<script setup>
// figure out if navLinks should be displayed
const route = useRoute()
const isHome = computed(() => route.path === '/')

// link objects array
let id = 0
const current = ref(0)
const links = ref([
  { label: 'Subscribe', isActive: true, ref: 'subscribe', id: id++ },
  { label: 'About', isActive: false, ref: 'about', id: id++ },
  { label: 'Stats', isActive: false, ref: 'stats', id: id++ },
  { label: 'Contact me', isActive: false, ref: 'contact', id: id++ },
])

// handles navigating to a different section of the homepage
const scroll = (link) => {
  links.value[current.value].isActive = false // disable the prev active button
  current.value = link.id // set the current as the clicked link
  links.value[current.value].isActive = true // set the isActive for current button

  // scroll to the targeted element
  const target = document.getElementById(link.ref)
  target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav
    class="from-gr-start to-gr-end fixed left-0 top-0 flex h-[160px] w-full items-center justify-between bg-gradient-to-r px-40 text-white">
    <span class="font-primary text-2xl font-semibold leading-8">
      <NuxtLink to="/">Jupify</NuxtLink>
    </span>
    <div class="flex gap-3" v-if="isHome">
      <Button
        :is-active="link.isActive"
        variant="navLink"
        v-for="link in links"
        :key="link.id"
        @click="scroll(link)">
        {{ link.label }}
      </Button>
    </div>
  </nav>
</template>
