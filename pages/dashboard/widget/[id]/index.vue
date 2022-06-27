<script setup lang="ts">
const { isSuperUser } = useUserStore()
const widget = useWidgetStore()
const { images } = toRefs(widget.value.heading)
const { onDrop, applyDrag } = useDnd(images)

const isMax3Image = computed(() => !isSuperUser && images.value.length >= 3)
const addImage = () => {
  if (isMax3Image.value) return
  images.value.push("")
}
const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}
const copyImage = (index: number) => {
  if (isMax3Image.value) return
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
    <label for="title">Button Label</label>
    <InputText v-model="widget.heading.title" id="title" name="title" placeholder="By hiMaker 👋🏻"></InputText>

    <label for="headline">Headline</label>
    <InputText
      v-model="widget.heading.headline"
      id="headline"
      name="headline"
      placeholder="This project is made by"
    ></InputText>

    <label for="maker_name">Name</label>
    <InputText v-model="widget.heading.name" id="maker_name" name="maker_name" placeholder="hiMaker 👋🏻"></InputText>

    <h3>Images <span v-if="!isSuperUser" class="text-gray-400 font-normal text-sm ml-2">(Max 3)</span></h3>
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
              <div
                v-if="!item"
                class="pointer-events-none w-full h-full flex flex-col items-center justify-center text-primary hover:text-primary-hover transition"
              >
                <div class="i-ion-upload text-5xl"></div>
                <p class="text-sm">Click to upload</p>
              </div>
              <img v-else class="w-full h-full object-cover" :src="item" :alt="item" />
              <Upload @done="setImage($event, i)"></Upload>
            </div>
            <InputText placeholder="https://<image>.com" v-model="images[i]"></InputText>
          </div>
        </Draggable>
      </Container>
    </div>

    <div class="flex space-x-4">
      <Button
        :disabled="isMax3Image"
        @click="addImage"
        icon="pi pi-plus"
        class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"
      ></Button>
      <div v-if="isMax3Image" class="text-red-500">
        <p class="inline-flex items-center">Max images added, upgrade to <TagSuper class="ml-2"></TagSuper></p>
        <p>to have unlimited image.</p>
      </div>
    </div>
  </div>
</template>
