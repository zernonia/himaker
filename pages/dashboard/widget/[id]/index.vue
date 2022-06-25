<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem"

const {
  params: { id },
} = useRoute()

const widget = useWidgetStore()
const { images } = toRefs(widget.value.heading)
const { onDrop, applyDrag } = useDnd(images)

const addImage = () => {
  images.value.push("")
}
const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}
const copyImage = (index: number) => {
  images.value.splice(index + 1, 0, images.value[index])
}
const clickUpload = (ev: Event) => {
  const div = ev.target as HTMLDivElement
  const input = (div.querySelector("input") as HTMLInputElement) || (div.nextSibling as HTMLInputElement)

  input?.click()
}
const setImage = (ev: string, index: number) => {
  images.value[index] = ev
}
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col form">
    <label for="title">Title</label>
    <InputText v-model="widget.heading.title" id="title" name="title" placeholder="by Me"></InputText>

    <label for="headline">Headline</label>
    <InputText
      v-model="widget.heading.headline"
      id="headline"
      name="headline"
      placeholder="This project is made by"
    ></InputText>

    <label for="maker_name">Name</label>
    <InputText v-model="widget.heading.name" id="maker_name" name="maker_name" placeholder="Supabase ⚡️"></InputText>

    <h3>Images</h3>
    <div class="flex items-center w-full overflow-x-auto">
      <Container
        style="width: max-content; overflow-x: auto"
        orientation="horizontal"
        @drop="onDrop"
        drag-handle-selector=".handle"
      >
        <Draggable v-for="(item, i) in images" :key="i">
          <div class="my-4 mx-2 flex flex-col items-center">
            <Handle horizontal @delete="deleteImage(i)" @copy="copyImage(i)"></Handle>
            <div
              @click="clickUpload"
              class="w-36 h-36 my-2 overflow-hidden rounded-full bg-white border border-teal-400 cursor-pointer"
            >
              <img v-if="item" class="w-full h-full object-cover" :src="item" :alt="item" />
              <Upload @done="setImage($event, i)"></Upload>
            </div>
            <InputText placeholder="https://<image>.com" v-model="images[i]"></InputText>
          </div>
        </Draggable>
      </Container>
    </div>
    <Button @click="addImage" icon="pi pi-plus" class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"></Button>
  </div>
</template>
