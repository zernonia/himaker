<script setup lang="ts">
const {
  params: { id },
} = useRoute()

const widget = useWidgetStore()
const { images } = toRefs(widget.value.heading)
const { onDrop, applyDrag } = useDnd(images)

const addImageUrl = (text: string) => {
  console.log(text)
}
const addImage = (el: HTMLInputElement) => {
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
    <div class="flex items-center w-full">
      <HandleAddImages @upload="addImage" @add="addImageUrl"></HandleAddImages>
      <Container style="width: max-content; overflow-x: auto" orientation="horizontal" @drop="onDrop">
        <Draggable v-for="(item, i) in images" :key="i">
          <div class="my-4 mx-2">
            <div class="w-36 h-36 rounded-full bg-white border border-teal-400">
              {{ item }}
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>
