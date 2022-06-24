<script setup lang="ts">
const widget = useWidgetStore()
const { projects } = toRefs(widget.value)
const { onDrop, applyDrag } = useDnd(projects)

const fetchMeta = (ev: FocusEvent, index: number) => {
  const url = (ev.target as HTMLInputElement).value
  if (!url) return
  $fetch("/api/url-meta", {
    method: "POST",
    body: {
      link: url,
    },
  }).then((response) => {
    if (projects.value[index].image === "") {
      projects.value[index].image = response.image
      console.log({ url, response })
    }
  })
}

const addProject = () => {
  projects.value.push({
    image: "",
    title: "",
    url: "",
  })
}
const deleteProject = (index: number) => {
  projects.value.splice(index, 1)
}
const clickUpload = (ev: Event) => {
  const div = ev.target as HTMLDivElement
  const input = (div.querySelector("input") as HTMLInputElement) || (div.nextSibling as HTMLInputElement)

  input?.click()
}
const setImage = (ev: string, index: number) => {
  projects.value[index].image = ev
}
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col">
    <h3>Projects</h3>

    <div class="overflow-x-auto">
      <Container orientation="horizontal" @drop="onDrop" drag-handle-selector=".handle">
        <Draggable v-for="(item, i) in projects" :key="i">
          <div class="m-2">
            <div class="flex flex-col items-center">
              <Handle horizontal @delete="deleteProject(i)"></Handle>

              <div class="w-full flex flex-col items-center space-y-4">
                <div
                  @click="clickUpload"
                  class="w-72 h-56 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-300 cursor-pointer"
                >
                  <img class="h-full w-full object-cover" v-if="item.image" :src="item.image" alt="" />
                  <Upload @done="setImage($event, i)"></Upload>
                </div>

                <div class="w-full flex flex-col form">
                  <label>Title</label>
                  <InputText v-model="item.title" class="!mb-2" placeholder="MadeWithSupabase"></InputText>
                  <label>URL</label>
                  <InputText
                    v-model="item.url"
                    placeholder="https://madewithsupabase.com/"
                    @blur="fetchMeta($event, i)"
                  ></InputText>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
    <Button @click="addProject" icon="pi pi-plus" class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"></Button>
  </div>
</template>
