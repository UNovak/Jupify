const isModalOpen = ref(false)
const component = ref<any>()

export const useModal = () => {
  return {
    isModalOpen,
    component,
    showModal: () => (isModalOpen.value = true),
    hideModal: () => (isModalOpen.value = false),
  }
}
