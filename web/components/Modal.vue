<script setup lang="ts">
const { isModalOpen, hideModal, component } = useModal()
</script>

<template>
  <Teleport to="#modal">
    <div
      class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      v-if="isModalOpen"
      @click="hideModal()">
      <component :is="component" @close="hideModal()" class="z-50" />
    </div>
  </Teleport>
</template>
