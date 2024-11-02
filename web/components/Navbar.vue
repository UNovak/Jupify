<script setup lang="ts">
// Define the Link type
type Link = {
  label: string
  isActive: boolean
  ref: string
  id: number
}

// figure out if navLinks should be displayed
const route = useRoute()
const isHome = computed(() => route.path === '/')
let id = 0
const current = ref(0)
let inScroll = false

// link objects array
const links = ref<Link[]>([
  { label: 'Subscribe', isActive: true, ref: 'subscribe', id: id++ },
  { label: 'About', isActive: false, ref: 'about', id: id++ },
  { label: 'Stats', isActive: false, ref: 'stats', id: id++ },
  { label: 'Contact me', isActive: false, ref: 'contact', id: id++ },
])

// update active style to match displayed section
const updateActive = (link: Link) => {
  links.value[current.value].isActive = false // disable the prev active button
  current.value = link.id // set current as the id of active section
  links.value[current.value].isActive = true // set the isActive for current button
}

// handles navigating to a different section of the homepage
const scroll = (link: Link) => {
  if (inScroll) return

  inScroll = true // disable observer
  updateActive(link)

  // scroll to the targeted element
  const target = document.getElementById(link.ref)
  target?.scrollIntoView({ behavior: 'smooth' })

  // wait 0.4s before enabling observer
  setTimeout(() => {
    inScroll = false
  }, 400)
}

// make each section observable on mount
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // runs when scrolling manually
      if (!inScroll) {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // entry currently in view
            const link = links.value.find(
              (link) => link.ref === entry.target.id,
            )
            if (link) updateActive(link) // update active style
          }
        }
      }
    },
    { threshold: 0.6 },
  )

  for (const link of links.value) {
    const target = document.getElementById(link.ref)
    if (target) {
      observer.observe(target)
    }
  }
})
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
