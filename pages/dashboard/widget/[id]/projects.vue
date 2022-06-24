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
    projects.value[index].image = response.image
    console.log({ url, response })
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
  console.log("deleteing " + index)
}
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col">
    <h3>Projects</h3>

    <Container orientation="vertical" @drop="onDrop" drag-handle-selector=".handle">
      <Draggable v-for="(item, i) in projects" :key="i">
        <div class="my-2">
          <div class="flex items-center">
            <Handle @delete="deleteProject(i)"></Handle>

            <div class="w-full flex items-center space-x-4">
              <div class="w-72 h-40 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-300">
                <img class="h-full object-cover" :src="item.image" alt="" />
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
    <Button @click="addProject" icon="pi pi-plus" class="p-button-rounded p-button-sm !mt-2 !w-10 !h-10"></Button>
  </div>
</template>
