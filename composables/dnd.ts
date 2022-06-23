import { Ref } from "vue"

interface DropResult {
  removedIndex: number
  addedIndex: number
  payload: any
}

export const useDnd = (items: Ref<any[]>) => {
  const onDrop = (dropResult: DropResult) => {
    items.value = applyDrag(items.value, dropResult)
  }

  const applyDrag = (arr: any[], dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult

    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }
    return result
  }

  return {
    onDrop,
    applyDrag,
  }
}
