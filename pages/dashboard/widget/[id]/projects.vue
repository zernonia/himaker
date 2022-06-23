<script setup lang="ts">
const data = ref([
  { id: 1, data: "Princess Mononoke" },
  { id: 2, data: "Spirited Away" },
])
const { onDrop, applyDrag } = useDnd(data)

const fetchMeta = (ev: FocusEvent) => {
  const url = (ev.target as HTMLInputElement).value
  if (!url) return
  $fetch("/api/url-meta", {
    method: "POST",
    body: {
      link: url,
    },
  }).then((response) => {
    console.log({ url, response })
  })
}
const deleteProject = (index: number) => {
  console.log("deleteing " + index)
}
</script>

<template>
  <div class="p-6 w-full bg-orange-50 rounded-xl flex flex-col">
    <h3>Projects</h3>

    <Container orientation="vertical" @drop="onDrop" drag-handle-selector=".handle">
      <Draggable v-for="(item, i) in data" :key="item.id">
        <div class="my-2">
          <div class="flex items-center">
            <Handle @delete="deleteProject(i)"></Handle>

            <div class="w-full flex items-center space-x-2">
              <div class="w-40 h-25 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-300">
                <img class="h-full object-cover" src="https://supabase-schema.vercel.app/og.png" alt="" />
              </div>
              <div class="w-full flex flex-col">
                <InputText class="!mb-2" placeholder="Title"></InputText>
                <InputText placeholder="URL" @blur="fetchMeta"></InputText>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>
