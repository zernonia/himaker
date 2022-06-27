export const useSuper = () => {
  const isOpen = useState("modal-state", () => false)
  const goSuper = () => {
    isOpen.value = true
  }
  return {
    isOpen,
    goSuper,
  }
}
