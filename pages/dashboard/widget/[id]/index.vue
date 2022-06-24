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
const pickFile = (el: HTMLInputElement) => {
  let files = el.files as FileList
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string
        let r = (Math.random() + 1).toString(36).substring(7)
        console.log({ result })
      }
      reader.readAsDataURL(files[i])
    }
  }
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
            <Handle horizontal @delete="deleteImage(i)"></Handle>
            <div class="w-36 h-36 my-2 overflow-hidden rounded-full bg-white border border-teal-400">
              <img v-if="item" class="w-full h-full object-cover" :src="item" :alt="item" />
            </div>
            <InputText v-model="images[i]"></InputText>
          </div>
        </Draggable>
      </Container>
    </div>
    <Button @click="addImage" icon="pi pi-plus" class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"></Button>
  </div>
</template>
