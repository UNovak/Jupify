// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    viewer: false,
    config: {
      theme: {
        extend: {
          colors: {
            'grad-start': '#16094E',
            'grad-end': '#2A1581',
            primary: '#25DAC5',
            secondary: '#482BE7',
          },
          fontFamily: {
            primary: ['Poppins', 'sans-serif'],
            secondary: ['DM Sans', 'sans-serif'],
          },
          lineHeight: {
            title: '86px',
            normal: '26px',
          },
          fontSize: {
            normal: '22px',
          },
        },
      },
    },
  },
  devtools: { enabled: true },
})
