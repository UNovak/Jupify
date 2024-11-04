<template>
  <!-- subscribe -->
  <Section id="subscribe">
    <template v-slot:title>{{ `Never miss\na vote again` }}</template>
    <template v-slot:description>
      {{
        `Tired of forgetting  to vote on Jupiter DAO?\nVerify your email and subscribe to be notified\nwhen a new vote opens`
      }}
    </template>
    <SubscribeForm />
  </Section>

  <!-- about -->
  <Section id="about">
    <template v-slot:title>{{ `What, how  and why` }}</template>
    <template v-slot:description>
      {{
        `Jupify is a project initially built for personal use.\nBut now i have decided to try and scale up,\nin hopes others might find the service useful.\nYou can help keep the service running by donating`
      }}
    </template>
  </Section>

  <!-- stats -->
  <Section id="stats">
    <template v-slot:title>{{ `Numbers speak\nfor themselves` }}</template>
    <template v-slot:description>
      {{ `Take a look at some data about the project` }}
    </template>
  </Section>

  <!-- contact -->
  <Section id="contact">
    <template v-slot:title>{{ 'Get in touch' }}</template>
    <template v-slot:description>
      {{
        `If you have any questions or requests\nsend me an email using the form below\n or open an issue on`
      }}
      <NuxtLink
        to="https://github.com/UNovak/Jupify/issues"
        external
        target="_blank"
        class="text-gray-400 hover:text-gray-600">
        GitHub
      </NuxtLink>
    </template>
    <ContactForm />
  </Section>
</template>
